export const Action = {
  UpdateApp: "UpdateApp",
  UpdateLogs: "LogsUpdate",
  InserLog: "LogInsert",
  UpdateLog: "LogUpdate",
  UpdateSelectedLog: "UpdateSelectedLog",
  UpdateAppSettings: "UpdateAppSettings",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Action.UpdateApp:
      return { ...state, app: action.app };
    case Action.UpdateAppSettings:
      const updated = { ...state.app, ...action.settings };
      const isProfileUpdated =
        state?.app?.activeProfileId !== updated.activeProfileId;
      action.callback(updated, isProfileUpdated);
      return { ...state, app: updated };
    case Action.UpdateLogs:
      return { ...state, logs: action.logs };
    case Action.InserLog:
      const logs = [action.log, ...state.logs];
      return { ...state, logs: logs };
    case Action.UpdateLog:
      const updatedItem = action.log;
      const filteredLogs = state?.logs.filter(
        (item) => item._id !== updatedItem._id
      );
      return { ...state, logs: [updatedItem, ...filteredLogs] };
    case Action.UpdateSelectedLog:
      return { ...state, selectedLog: action.log };
  }
};
