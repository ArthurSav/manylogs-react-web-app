export const convertLightLogToListDisplayable = (log) => {
  return {
    id: log._id,
    method: log.method,
    code: log.code,
    url: log.url,
    timestamp: Number(log.dateUpdated),
  };
};
