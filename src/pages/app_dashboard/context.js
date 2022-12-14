import {
  useReducer,
  useEffect,
  createContext,
  useContext,
  useState,
} from "react";
import { Action, reducer } from "./reducer";
import { useParams } from "react-router";
import { WSManagerAppDashboard } from "../../api/ManylogsSockets";
import {
  createHttpProfile as apiCreateProfile,
  deleteHttpProfile as apiDeleteProfile,
  updateProfileLog as apiUpdateProfileLog,
} from "../../api/ManylogsApi";

const initialState = {};

const AppDashboardContext = createContext();

const AppDashboardContextProvider = ({ children }) => {
  const appId = useParams().id; // url param
  const [socketManager] = useState(() => WSManagerAppDashboard(appId));
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    appId: appId,
  });

  // socket event handlers
  const onAppLoaded = (app) => dispatch({ type: Action.UpdateApp, app: app });
  const onAppEvent = (event) => {
    if (event.operation === "update") {
      dispatch({ type: Action.UpdateApp, app: event.app });
    }
  };
  const onAppLogs = (logs) => dispatch({ type: Action.UpdateLogs, logs: logs });
  const onLogEvent = (event) => {
    switch (event.operation) {
      case "insert":
        dispatch({ type: Action.InserLog, log: event.log });
        break;
      case "replace":
      case "update":
        dispatch({
          type: Action.UpdateLog,
          log: event.log,
          callback: (state) => {
            // reload selected item, if needed
            if (state.selectedLog?.full?._id === event.log._id) {
              socketManager?.requestLogItem(event.log._id);
            }
          },
        });
        break;
    }
  };
  const onLogItemDetails = (item) => {
    dispatch({
      type: Action.UpdateSelectedLog,
      log: {
        full: item,
        isLoading: false,
      },
    });
  };

  // UI actions
  const updateAppSettings = (settings) => {
    const callback = (app, isProfileUpdated) => {
      if (isProfileUpdated)
        dispatch({ type: Action.UpdateSelectedLog, log: undefined }); // remove selected log item
      socketManager?.updateSettings(app, isProfileUpdated);
    };

    dispatch({
      type: Action.UpdateAppSettings,
      settings: settings,
      callback: callback,
    });
  };

  const loadLogItemDetails = (item) => {
    dispatch({
      type: Action.UpdateSelectedLog,
      log: { preview: item, isLoading: true },
    });
    socketManager?.requestLogItem(item.id);
  };

  // Http calls
  const createHttpProfile = ({ name, onLoading, onSuccess, onError }) => {
    const body = {
      appId: appId,
      name: name,
    };

    apiCreateProfile({
      body: body,
      onLoading: onLoading,
      onSuccess: onSuccess,
      onError: onError,
    });
  };

  const deleteHttpProfile = ({ profileId, onLoading, onSuccess, onError }) => {
    const body = {
      appId: appId,
      profileId: profileId,
    };

    apiDeleteProfile({
      body: body,
      onLoading: onLoading,
      onSuccess: onSuccess,
      onError: onError,
    });
  };

  /**
   * Updates profile log response
   */
  const updateLogResponse = ({ itemId, response, onSuccess, onError }) => {
    const body = {
      appId: appId,
      profileLogId: itemId,
      response: response,
    };

    apiUpdateProfileLog({ body: body, onSuccess: onSuccess, onError: onError });
  };

  useEffect(() => {
    socketManager?.start(
      onAppLoaded,
      onAppEvent,
      onAppLogs,
      onLogEvent,
      onLogItemDetails
    );
    return () => {
      socketManager?.stop();
    };
  }, []);

  return (
    <AppDashboardContext.Provider
      value={{
        ...state,
        updateAppSettings,
        createHttpProfile,
        deleteHttpProfile,
        loadLogItemDetails,
        updateLogResponse,
      }}
    >
      {children}
    </AppDashboardContext.Provider>
  );
};

export const useAppDashboardContext = () => useContext(AppDashboardContext);

export { AppDashboardContextProvider };
