import { session } from "../session";

const HOST = process.env.REACT_APP_WS_ENDPOINT;
const SOCKET_APPS = `${HOST}/web/apps`;
const SOCKET_APPS_DETAIL = `${HOST}/web/apps/details`;

export const WSManagerApps = () => {
  let ws = {};
  var isAuthenticated = false;
  const token = session().token;

  // authenticates & requests app
  const sendFirstPayload = (token) => {
    ws.send(
      JSON.stringify({
        token: token,
        messages: [
          {
            type: "list_apps",
          },
        ],
      })
    );
  };

  const start = (onAppsLoaded, onAppEvent) => {
    ws = new WebSocket(SOCKET_APPS);
    ws.onopen = () => {
      sendFirstPayload(token);
    };

    ws.onmessage = (e) => {
      // console.log("(socket message): ", e.data);
      const data = JSON.parse(e.data);
      const type = data.type;

      if (isAuthenticated) {
        switch (type) {
          case "apps": {
            onAppsLoaded(data.apps);
            break;
          }
          case "app_event": {
            onAppEvent(data.event);
            break;
          }
          default: {
            console.log("Could not handle message type");
          }
        }
      } else if (type === "authentication_ok") {
        isAuthenticated = true;
      }
    };
  };

  const stop = () => {
    ws?.close();
  };

  return {
    start: start,
    stop: stop,
  };
};

export const WSManagerAppDashboard = (appId) => {
  let ws = {};
  var isAuthenticated = false;
  const token = session().token;

  const start = (
    onAppLoaded,
    onAppEvent,
    onAppLogs,
    onLogEvent,
    onLogItemDetails
  ) => {
    ws = new WebSocket(SOCKET_APPS_DETAIL);
    ws.onopen = () => {
      sendAuthenticate(token, appId); // authenticate
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const type = data.type;

      // console.log("(socket message type): ", type);

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
          case "app_profile_logs": {
            onAppLogs(data.logs);
            break;
          }
          case "app_profile_log_event": {
            onLogEvent(data.eventLog);
            break;
          }
          case "log_item_details": {
            onLogItemDetails(data.logItem);
            break;
          }
        }
      } else {
        if (type == "authentication_ok") {
          isAuthenticated = true;
        }
      }
    };
  };

  const stop = () => ws.close();

  const send = (data) => ws?.send(JSON.stringify(data));

  // send

  // authenticates & requests app
  const sendAuthenticate = (token, appId) => {
    send({
      token: token,
      messages: [
        {
          type: "app",
          appId: appId,
        },
        {
          type: "app_profile_logs",
          appId: appId,
        },
      ],
    });
  };

  // update

  const requestUpdateSettings = (args, isProfileUpdated) => {
    const messages = [];
    messages.push({
      type: "app_update_settings",
      appId: appId,
      settings: {
        activeProfileId: args.activeProfileId,
        isRecordEnabled: args.isRecordEnabled,
        isReplayEnabled: args.isReplayEnabled,
      },
    });

    if (isProfileUpdated) {
      messages.push({
        type: "app_profile_logs",
        appId: appId,
        profileId: args.activeProfileId,
      });
    }

    send({ messages: messages });
  };

  const requestLogItem = (logId) => {
    const messages = [
      {
        type: "log_item_details",
        appId: appId,
        logId: logId,
      },
    ];
    send({ messages: messages });
  };

  return {
    start: start,
    stop: stop,
    updateSettings: requestUpdateSettings,
    requestLogItem: requestLogItem,
  };
};
