import { Box, Button, Grid, Heading } from "grommet";
import AppListItem from "../components/app_list_overview/AppListItem";
import { useEffect, useState } from "react";
import SecretMenu from "./SecretMenu";
import { WSManagerApps } from "../api/ManylogsSockets";
import { Link, Redirect } from "react-router-dom";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [socketManager] = useState(() => WSManagerApps());

  const onAppsLoaded = (loadedApps) => {
    setApps([...loadedApps]);
  };

  const onAppEvent = (event) => {
    console.log("onAppEvent: " + event.operation);
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

  useEffect(() => {
    console.log("(final)apps: " + apps.length);
    console.log(apps);
  }, [apps]);

  return (
    <Box align="start" justify="center">
      <Heading margin={{ left: "small" }}>My Apps</Heading>
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
            return <AppListItem key={app.id} {...app} />;
          })}
        </Grid>
      </Box>
      <SecretMenu />
      <Link to="/app">App</Link>
    </Box>
  );
};

export default MyApps;
