import { session } from "../context";

export const openMyAppsSocket = (onAppsLoaded, onAppEvent) => {
  const ws = new WebSocket("ws://localhost:8080/web/apps") || {};
  const token = session().token;
  var isAuthenticated = false;

  const messageAuth = (token) => {
    return {
      type: "authenticate",
      token: token,
    };
  };

  const messageListApps = () => {
    return {
      type: "list_apps",
    };
  };

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

export const WSManagerAppDetails = (appId) => {
  let ws = {};
  var isAuthenticated = false;
  const token = session().token;

  const start = (onAppLoaded, onAppEvent) => {
    ws = new WebSocket("ws://localhost:8080/web/apps/details");
    ws.onopen = () => {
      console.log("(socket open)");

      // authenticate
      sendAuthenticate(token, appId);
    };

    ws.onmessage = (e) => {
      console.log("(socket message): ", e.data);

      const data = JSON.parse(e.data);
      const type = data.type;

      if (isAuthenticated) {
        switch (type) {
          case "app": {
            onAppLoaded(data.app);
            break;
          }
          case "app_event": {
            onAppEvent(data.event);
            break;
          }
        }
      } else {
        if (type == "authentication_ok") {
          isAuthenticated = true;
        }
      }
    };

    ws.onclose = (e) => {
      console.log("(socket closed): ", e.code, e.reason);
    };
  };

  const stop = () => {
    ws.close();
  };

  // send

  const sendAuthenticate = (token, appId) => {
    ws.send(
      // authenticates & requests app
      JSON.stringify({
        token: token,
        messages: [
          {
            type: "app",
            appId: appId,
          },
        ],
      })
    );
  };

  // update

  const sendUpdateAppSettings = (args) => {
    const payload = {
      messages: [
        {
          type: "app_update_settings",
          appId: appId,
          settings: {
            activeProfileId: args.activeProfileId,
            isRecordEnabled: args.isRecordEnabled,
            isReplayEnabled: args.isReplayEnabled,
          },
        },
      ],
    };

    ws.send(JSON.stringify(payload));
  };

  return {
    start: start,
    stop: stop,
    updateSettings: sendUpdateAppSettings,
  };
};
