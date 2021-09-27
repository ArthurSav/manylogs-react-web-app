import {
  Box,
  Text,
  CheckBox,
  Select,
  Heading,
  TextArea,
  Button,
} from "grommet";

import { Edit } from "grommet-icons";
import { useParams } from "react-router";
import React, { useEffect, useState, useContext } from "react";
import { WSManagerAppDetails } from "../api/ManylogsSockets";
import { ListLogItem } from "../components/ListLogItem";

const DashboardContext = React.createContext();

const AppDashboard = () => {
  const appId = useParams().id;
  const [app, setApp] = useState();
  const [logs, setLogs] = useState();
  const [socketManager] = useState(() => WSManagerAppDetails(appId));

  const onAppLoaded = (app) => {
    setApp({ ...app });
  };

  const onAppEvent = (event) => {
    if (event.operation == "update") {
      setApp(event.app);
    }
  };

  const onAppLogs = (logs) => {
    setLogs([...logs]);
  };

  const onLogEvent = (event) => {
    switch (event.operation) {
      case "insert": {
        setLogs((logs) => [event.log, ...logs]);
        break;
      }
      case "replace":
      case "update": {
        setLogs((logs) => {
          const filtered = logs.filter((item) => item._id !== event.log._id);
          return [event.log, ...filtered];
        });
        break;
      }
    }
  };

  const updateAppSettings = (args) => {
    setApp((app) => {
      const updated = { ...app, ...args };
      const isProfileUpdated = app.activeProfileId !== updated.activeProfileId;
      socketManager?.updateSettings(updated, isProfileUpdated);
      return updated;
    });
  };

  useEffect(() => {
    socketManager?.start(onAppLoaded, onAppEvent, onAppLogs, onLogEvent);
    return () => {
      socketManager?.stop();
    };
  }, []);

  return (
    <DashboardContext.Provider value={{ app, setApp, updateAppSettings, logs }}>
      {app ? (
        <Box
          fill="vertical"
          overflow="auto"
          align="center"
          flex="grow"
          justify="center"
          direction="row-responsive"
          gap="small"
        >
          <PanelApp key="panelApp" />
          {logs && <PanelLogs key="panelLogs" />}
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </DashboardContext.Provider>
  );
};

const PanelApp = () => {
  const { app, setApp, updateAppSettings } = useContext(DashboardContext);
  const { id, name, isConnected, isReplayEnabled, isRecordEnabled } = app;

  // profiles
  const profiles = app.profiles.map((p) => p.name);
  const selectedProfileName = app.profiles.find(
    (p) => p.id === app.activeProfileId
  ).name;

  const updateSelectedProfile = (value) => {
    const profile = app.profiles.find((p) => p.name === value);
    updateAppSettings({ activeProfileId: profile.id });
  };

  const setChecked = (args) => {
    updateAppSettings({ ...args });
  };

  return (
    <Box
      align="start"
      justify="start"
      background={{ color: "background-contrast" }}
      round="medium"
      gap="none"
      direction="row-responsive"
      pad="small"
      height="large"
    >
      <Box
        align="center"
        justify="start"
        responsive
        flex="grow"
        round="small"
        direction="column"
        gap="medium"
      >
        <Box
          align="center"
          justify="start"
          direction="row-responsive"
          gap="medium"
          border={{ color: "dark-6", side: "bottom" }}
          pad="medium"
          flex="grow"
          fill="horizontal"
        >
          <Box
            align="center"
            justify="center"
            pad="small"
            background={{ color: "light-4" }}
            round="xsmall"
          >
            <Text size="4xl">📱</Text>
          </Box>
          <Box
            align="stretch"
            justify="start"
            direction="column"
            margin={{ left: "small", right: "small" }}
            gap="xsmall"
          >
            <Text size="xlarge" weight="bold">
              {name}
            </Text>
            <Box align="center" justify="start" direction="row-responsive">
              <Text size="medium">{isConnected ? "online" : "offline"}</Text>
              <Box
                align="center"
                justify="center"
                background={
                  isConnected
                    ? { color: "status-ok" }
                    : { color: "status-disabled" }
                }
                pad="xsmall"
                round="medium"
                border={{ color: "light-3", size: "xsmall", side: "all" }}
                margin={{ left: "xsmall" }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          align="start"
          justify="start"
          fill="horizontal"
          direction="row-responsive"
        >
          <Select
            options={profiles}
            value={selectedProfileName}
            onChange={({ option }) => updateSelectedProfile(option)}
          />
        </Box>
        <Box
          align="center"
          justify="center"
          direction="row"
          gap="small"
          fill="horizontal"
        >
          <Box
            align="start"
            justify="start"
            flex="grow"
            fill="vertical"
            round="small"
            pad="xsmall"
            gap="medium"
          >
            <CheckBox
              label="Record"
              toggle
              reverse
              checked={isRecordEnabled}
              onChange={(event) =>
                setChecked({ isRecordEnabled: event.target.checked })
              }
            />
            <CheckBox
              label="Replay"
              toggle
              reverse
              checked={isReplayEnabled}
              onChange={(event) =>
                setChecked({ isReplayEnabled: event.target.checked })
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const PanelLogs = () => {
  const { logs } = useContext(DashboardContext);
  return (
    <Box
      align="start"
      justify="start"
      width="large"
      height="large"
      round="medium"
      pad="small"
      gap="xxsmall"
      direction="column"
      background={{ color: "background-contrast" }}
      overflow="auto"
    >
      <Box
        align="start"
        justify="start"
        fill="horizontal"
        direction="column"
        gap="xxsmall"
        responsive
        flex="grow"
      >
        {logs.map((item) => {
          return <ListLogItem key={item._id} item={item} />;
        })}
      </Box>
    </Box>
  );
};

const PanelLogDetails = () => {
  return (
    <Box
      align="start"
      justify="start"
      width="large"
      height="xlarge"
      background={{ color: "background-contrast" }}
      round="medium"
      pad="medium"
      gap="medium"
      direction="column"
    >
      <Box
        align="center"
        justify="center"
        direction="row-responsive"
        gap="xsmall"
        fill="horizontal"
        pad="xsmall"
        round="xsmall"
      >
        <Box
          align="center"
          justify="center"
          pad="small"
          round="xsmall"
          background={{ color: "graph-3", opacity: "medium" }}
        >
          <Text weight="bold" size="small">
            GET
          </Text>
        </Box>
        <Box
          align="center"
          justify="center"
          pad="small"
          round="xsmall"
          background={{ color: "accent-1", opacity: "medium" }}
        >
          <Text weight="bold" size="small">
            200
          </Text>
        </Box>
        <Box
          align="start"
          justify="start"
          pad="xsmall"
          round="small"
          fill="horizontal"
        >
          <Text weight="bold" size="medium">
            /v1/posts
          </Text>
          <Text size="xsmall">https://www.box.com/v1/posts?id=1</Text>
        </Box>
      </Box>
      <Box
        align="start"
        justify="center"
        background={{ color: "dark-1", opacity: "medium" }}
        fill="horizontal"
        pad="small"
        round="xsmall"
      >
        <Box align="center" justify="center">
          <Heading
            size="small"
            level="3"
            margin={{ bottom: "medium", top: "none" }}
          >
            Request
          </Heading>
        </Box>
        <Box align="start" justify="center" fill="horizontal">
          <Heading
            size="small"
            level="4"
            margin={{ top: "xsmall", bottom: "xsmall" }}
            color="text-weak"
          >
            Headers
          </Heading>
          <Box
            align="center"
            justify="center"
            direction="row-responsive"
            gap="xsmall"
            fill="horizontal"
            background={{ color: "dark-2" }}
            pad="xsmall"
            round="xsmall"
            height="xsmall"
            overflow="auto"
          >
            <TextArea plain fill size="small" />
          </Box>
        </Box>
        <Box align="start" justify="start" fill="horizontal">
          <Heading
            size="small"
            level="4"
            margin={{ bottom: "xsmall", top: "medium" }}
            color="text-weak"
          >
            Body
          </Heading>
          <Box
            align="center"
            justify="center"
            direction="row-responsive"
            gap="xsmall"
            fill="horizontal"
            background={{ color: "dark-2" }}
            pad="xsmall"
            round="xsmall"
            height="small"
            overflow="auto"
          >
            <TextArea size="small" fill plain />
          </Box>
        </Box>
      </Box>
      <Box
        align="start"
        justify="center"
        background={{ color: "dark-1", opacity: "medium" }}
        fill="horizontal"
        pad="small"
        round="xsmall"
      >
        <Box
          align="center"
          justify="start"
          fill="horizontal"
          direction="row-responsive"
        >
          <Heading
            size="small"
            level="3"
            margin={{ top: "none", bottom: "medium" }}
          >
            Response
          </Heading>
          <Box align="end" justify="center" fill="horizontal">
            <Button label="Edit" icon={<Edit />} reverse={false} size="small" />
          </Box>
        </Box>
        <Box align="start" justify="center" fill="horizontal">
          <Heading
            size="small"
            level="4"
            margin={{ top: "xsmall", bottom: "xsmall" }}
          >
            Headers
          </Heading>
          <Box
            align="center"
            justify="center"
            direction="row-responsive"
            gap="xsmall"
            fill="horizontal"
            background={{ color: "dark-2" }}
            pad="xsmall"
            round="xsmall"
            height="xsmall"
            overflow="auto"
          >
            <TextArea plain fill size="small" />
          </Box>
        </Box>
        <Box align="start" justify="start" fill="horizontal">
          <Heading
            size="small"
            level="4"
            margin={{ bottom: "xsmall", top: "medium" }}
          >
            Body
          </Heading>
          <Box
            align="center"
            justify="center"
            direction="row-responsive"
            gap="xsmall"
            fill="horizontal"
            background={{ color: "dark-2" }}
            pad="xsmall"
            round="xsmall"
            height="small"
            overflow="auto"
          >
            <TextArea size="small" plain fill />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppDashboard;
