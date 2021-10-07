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
import { postCreateHttpProfile } from "../../api/ManylogsApi";

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
    switch (event.type) {
      case "insert":
        dispatch({ type: Action.InserLog, log: event.log });
        break;
      case "replace":
      case "update":
        dispatch({ type: Action.UpdateLog, log: event.log });
        break;
    }
  };
  const onLogItemDetails = (item) =>
    dispatch({ type: Action.UpdateSelectedLog, log: item });

  // UI actions
  const updateAppSettings = (settings) => {
    const callback = (app, isProfileUpdated) =>
      socketManager?.updateSettings(app, isProfileUpdated);
    dispatch({
      type: Action.UpdateAppSettings,
      settings: settings,
      callback: callback,
    });
  };

  // Http calls
  const createHttpProfile = ({ name, onLoading, onSuccess, onError }) => {
    const body = {
      appId: appId,
      name: name,
    };
    const onCustomSuccess = (profile) => {
      // todo - update profile
      onSuccess();
    };
    postCreateHttpProfile({
      body: body,
      onLoading: onLoading,
      onSuccess: onCustomSuccess,
      onError: onError,
    });
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
      }}
    >
      {children}
    </AppDashboardContext.Provider>
  );
};

export const useAppDashboardContext = () => useContext(AppDashboardContext);

export { AppDashboardContextProvider };
