import { Box, Grid, Heading } from "grommet";
import AppItem from "../components/AppItem";
import { mockApps } from "../mocks/mockApps";
import { useEffect, useState } from "react";
import SecretMenu from "./SecretMenu";
import { openMyAppsSocket } from "../api/ManylogsSockets";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const onAppsLoaded = (loadedApps) => {
    setApps(loadedApps);
  };

  const onAppEvent = (event) => {
    console.log("onAppEvent: " + event.operation);
    switch (event.operation) {
      case "insert": {
        console.log("case insert");
        setApps([...apps, event.app]);
        break;
      }
      case "update":
      case "replace": {
        console.log("case update/replace");
        const updated = apps.map((app) =>
          app.id === event.appId ? event.app : app
        );
        setApps(updated);
        break;
      }
      case "delete": {
        console.log("case delete");
        const updated = apps.filter((app) => app.id !== event.appId);
        setApps(updated);
        break;
      }
    }
  };

  useEffect(() => {
    const ws = openMyAppsSocket(onAppsLoaded, onAppEvent);
    return () => {
      ws.close();
    };
  }, []);

  return (
    <Box align="start" justify="center">
      <Heading margin={{ left: "small" }}> My Apps</Heading>
      <Box
        overflow="auto"
        pad="large"
        width="xlarge"
        height="xlarge"
        round="small"
        background={{ color: "background-contrast" }}
      >
        <Grid gap="large" columns="small">
          {apps.map((app) => {
            return <AppItem key={app.id} {...app} />;
          })}
        </Grid>
      </Box>
      <SecretMenu />
    </Box>
  );
};

export default MyApps;
