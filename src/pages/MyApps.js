import { Box, Grid, Heading, ResponsiveContext } from "grommet";
import AppListItem from "../components/app_list_overview/AppListItem";
import { useEffect, useState } from "react";
import { WSManagerApps } from "../api/ManylogsSockets";
import SidebarContainer from "../components/SidebarContainer";

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
      <Box fill="vertical">
        <Heading level={3} margin={{ left: "small" }}>
          My Apps
        </Heading>
        <Box
          overflow="auto"
          pad="large"
          width="xlarge"
          fill="vertical"
          height={{
            min: "large",
          }}
          round="small"
          background={{ color: "background-contrast" }}
        >
          <Grid gap="large" columns="small">
            {apps.map((app) => {
              return <AppListItem key={app.id} {...app} />;
            })}
          </Grid>
        </Box>
      </Box>
    </SidebarContainer>
  );
};

export default MyApps;
