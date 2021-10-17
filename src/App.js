import React from "react";
import MyApps from "./pages/MyApps";
import { Grommet } from "grommet";
import Signin from "./pages/PageLogin";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import AppDashboard from "./pages/app_dashboard/AppDashboard";
import { isAuthenticated } from "./session";
import { mainTheme } from "./theme";

const hist = createBrowserHistory();

function App() {
  const auth = isAuthenticated();
  return (
    <Grommet full theme={mainTheme} themeMode="dark">
      <Router history={hist}>
        <Switch>
          <Route path="/login" render={(props) => <Signin />} key="login" />
          <Route exact path="/apps" render={(props) => <MyApps />} key="apps" />
          <Route
            exact
            path="/apps/:id"
            render={(props) => <AppDashboard />}
            key="app"
          />
          {auth ? (
            <Redirect from="/" to="/apps" />
          ) : (
            <Redirect from="/" to="/login" />
          )}
        </Switch>
      </Router>
    </Grommet>
  );
}

export default App;
