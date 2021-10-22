import { session } from "../session";

const HOST = process.env.REACT_APP_WS_ENDPOINT;
const SOCKET_APPS = `${HOST}/web/apps`;
const SOCKET_APPS_DETAIL = `${HOST}/web/apps/details`;

export const WSManagerApps = () => {
  const manager = WSManager(SOCKET_APPS);
  const start = (onAppsLoaded, onAppEvent) => {
    const onMessage = (data, type) => {
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
    };
    manager.setEventHandlers(onMessage);

    sendRequestAppList();
  };

  const sendRequestAppList = () => {
    manager.send({
      messages: [
        {
          type: "list_apps",
        },
      ],
    });
  };

  const stop = () => manager.stop();

  return {
    start: start,
    stop: stop,
  };
};

export const WSManagerAppDashboard = (appId) => {
  const manager = WSManager(SOCKET_APPS_DETAIL);

  const start = (
    onAppLoaded,
    onAppEvent,
    onAppLogs,
    onLogEvent,
    onLogItemDetails
  ) => {
    const onMessage = (data, type) => {
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
    };
    manager.setEventHandlers(onMessage);

    // request app info
    sendRequestAppInfo(appId);
  };

  const sendRequestAppInfo = (appId) => {
    manager.send({
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

    manager.send({ messages: messages });
  };

  const requestLogItem = (logId) => {
    const messages = [
      {
        type: "log_item_details",
        appId: appId,
        logId: logId,
      },
    ];
    manager.send({ messages: messages });
  };

  const stop = () => manager.stop();

  return {
    start: start,
    stop: stop,
    updateSettings: requestUpdateSettings,
    requestLogItem: requestLogItem,
  };
};

const WSManager = (path) => {
  let queue = [];
  let ws = null;
  var isAuthenticated = false;

  // event handlers
  const events = {};

  const socket = (runWhenReady) => {
    if (!ws || ws.readyState === 3) {
      ws = new WebSocket(path);
      ws.onopen = () => {
        console.log("opened socket");
        if (queue.length > 0) sendQueue();
        else authenticate();
      };
      ws.onclose = () => {
        console.log("closed socket");
        queue = [];
        isAuthenticated = false;
      };
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        const type = data.type;

        if (isAuthenticated) {
          if (events.onMessage) events.onMessage(data, type);
        } else {
          if (type == "authentication_ok") {
            isAuthenticated = true;
          }
        }
      };
    }

    runWhenReady(ws);
  };

  const token = () => {
    const token = session().token;
    if (!token) throw "Unable to authenticate user. Session token missing.";
    return token;
  };

  const authenticate = () => {
    send({ token: token() });
  };

  const sendQueue = () => {
    queue.forEach((p) => send(p));
    queue = [];
  };

  const send = (payload) => {
    socket((ws) => {
      // add to queue if not ready
      if (ws.readyState !== 1) {
        queue.push(payload);
      } else {
        // set auth token if needed
        if (!isAuthenticated && payload?.token === undefined) {
          payload.token = token();
        }

        ws.send(JSON.stringify(payload));
      }
    });
  };

  const setEventHandlers = (onMessage) => {
    events.onMessage = onMessage;
  };

  const start = () => socket();
  const stop = () => ws?.close();

  return {
    setEventHandlers: setEventHandlers,
    send: send,
    start: start,
    stop: stop,
  };
};
