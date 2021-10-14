import React from "react";
import MyApps from "./pages/MyApps";
import { Grommet, Box } from "grommet";
import Signin from "./pages/Signin";
import { Switch, Route, Router, Redirect, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import AppDashboard from "./pages/app_dashboard/AppDashboard";
import { isAuthenticated } from "./context";
import { mainTheme } from "./theme";

const hist = createBrowserHistory();

function App() {
  const auth = isAuthenticated();
  return (
    <Grommet full theme={mainTheme}>
      <Box
        align="center"
        justify="center"
        background={{ color: "dark-1" }}
        overflow="auto"
        fill="vertical"
      >
        <Router history={hist}>
          <Switch>
            <Route path="/signin" render={(props) => <Signin />} key="login" />
            <Route
              exact
              path="/apps"
              render={(props) => <MyApps />}
              key="apps"
            />
            <Route
              exact
              path="/apps/:id"
              render={(props) => <AppDashboard />}
              key="app"
            />
            {auth ? (
              <Redirect from="/" to="/apps" />
            ) : (
              <Redirect from="/" to="/signin" />
            )}
          </Switch>
        </Router>
      </Box>
    </Grommet>
  );
}

export default App;
