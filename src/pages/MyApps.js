import { Box, Grid, Heading, ResponsiveContext } from "grommet";
import AppListItem from "../components/app_list_overview/AppListItem";
import { useEffect, useState } from "react";
import SecretMenu from "./SecretMenu";
import { WSManagerApps } from "../api/ManylogsSockets";
import { Link, Redirect } from "react-router-dom";
import SidebarContainer from "../components/SidebarContainer";
import { calculatePageContainerHeight } from "../util/util";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [socketManager] = useState(() => WSManagerApps());

  const onAppsLoaded = (loadedApps) => {
    setApps([...loadedApps]);
  };

  const onAppEvent = (event) => {
    switch (event.operation) {
      case "insert": {
        setApps((apps) => [...apps, event.app]);
        break;
      }
      case "update":
      case "replace": {
        setApps((apps) => {
          const updated = apps.map((app) =>
            app.id === event.appId ? event.app : app
          );
          return [...updated];
        });
        break;
      }
      case "delete": {
        setApps((apps) => {
          const updated = apps.filter((app) => app.id !== event.appId);
          return [...updated];
        });
        break;
      }
    }
  };

  useEffect(() => {
    socketManager?.start(onAppsLoaded, onAppEvent);
    return () => {
      socketManager?.stop();
    };
  }, []);

  return (
    <SidebarContainer>
      <Box flex="grow" pad={{ horizontal: "medium" }}>
        <Heading level={3} margin={{ left: "small" }}>
          My Apps
        </Heading>
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box
              overflow="auto"
              pad="large"
              margin={{ bottom: "medium" }}
              width="xlarge"
              height={calculatePageContainerHeight(size)}
              round="small"
              background={{ color: "background-contrast" }}
            >
              <Grid gap="large" columns="small">
                {apps.map((app) => {
                  return <AppListItem key={app.id} {...app} />;
                })}
              </Grid>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Box>
    </SidebarContainer>
  );
};

export default MyApps;
