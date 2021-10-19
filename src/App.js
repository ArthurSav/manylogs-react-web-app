import React from "react";
import MyApps from "./pages/MyApps";
import { Grommet } from "grommet";
import PageLogin from "./pages/PageLogin";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import AppDashboard from "./pages/app_dashboard/AppDashboard";
import { isAuthenticated } from "./session";
import { mainTheme } from "./theme";
import PageSignup from "./pages/PageSignup";

const hist = createBrowserHistory();

function App() {
  return (
    <Grommet full theme={mainTheme}>
      <Router history={hist}>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => <PageLogin />}
            key="login"
          />
          <Route
            exact
            path="/signup"
            render={(props) => <PageSignup />}
            key="signup"
          />
          <PrivateRoute exact path="/" key="apps">
            <MyApps />
          </PrivateRoute>
          <PrivateRoute exact path="/apps/:id" key="app">
            <AppDashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </Grommet>
  );
}

const PrivateRoute = ({ children, ...rest }) => {
  let auth = isAuthenticated();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
