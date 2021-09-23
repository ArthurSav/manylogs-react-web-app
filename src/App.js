import React from "react";
import MyApps from "./pages/MyApps";
import { Grommet, Box, Grid, Button } from "grommet";
import { grommet } from "grommet/themes";
import Signin from "./pages/Signin";
import { Switch, Route, Router, Redirect, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import AppDashboard from "./pages/AppDashboard";
import { isAuthenticated } from "./context";

const hist = createBrowserHistory();

function App() {
  const auth = isAuthenticated();
  console.log("authenticated: " + auth);
  return (
    <Grommet full theme={grommet}>
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

const theme = {
  name: "dark",
  rounding: 4,
  spacing: 24,
  defaultMode: "light",
  global: {
    colors: {
      brand: "#FD6FFF",
      background: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#444444",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
      control: {
        light: "#403216",
        dark: "#FFCA58",
      },
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF3333",
      "status-warning": "#F7E464",
      "status-ok": "#7DD892",
      "status-unknown": "#a8a8a8",
      "status-disabled": "#a8a8a8",
      "graph-0": "brand",
      "graph-1": "green",
      red: {
        dark: "#EB6060",
        light: "#FD6FFF",
      },
      "red!": "",
      green: {
        dark: "#01C781",
        light: "#60EB9F",
      },
      "green!": "",
      blue: {
        dark: "#6095EB",
        light: "#60EBE1",
      },
      "blue!": "",
      yellow: {
        dark: "#FFB200",
        light: "#FFCA58",
      },
      "yellow!": "",
      "graph-2": "yellow",
      "graph-3": "blue",
    },
    font: {
      family: "Arial",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  layer: {
    background: {
      dark: "#111111",
      light: "#FFFFFF",
    },
  },
  email: "arthur.saveliev@gmail.com",
  date: "2020-02-14T21:46:37.000Z",
};

export default App;
