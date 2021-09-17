import { session } from "../context";

export const openMyAppsSocket = (onAppsLoaded, onAppEvent) => {
  const ws = new WebSocket("ws://localhost:8080/web/apps") || {};
  const token = session().token;
  var isAuthenticated = false;

  ws.onopen = () => {
    console.log("(socket open)");
    const payload = [messageAuth(token), messageListApps()];
    ws.send(JSON.stringify(payload));
  };

  ws.onclose = (e) => {
    console.log("(socket closed): ", e.code, e.reason);
  };

  ws.onmessage = (e) => {
    console.log("(socket message): ", e.data);

    const data = JSON.parse(e.data);
    const type = data.type;

    if (isAuthenticated) {
      if (type == "apps") {
        onAppsLoaded(data.apps);
      } else if (type == "app_event") {
        onAppEvent(data.event);
      }
    } else if (type == "authenticate_ok") {
      isAuthenticated = true;
    }
  };

  return ws;
};

const messageListApps = () => {
  return {
    type: "list_apps",
  };
};

const messageAuth = (token) => {
  return {
    type: "authenticate",
    token: token,
  };
};
