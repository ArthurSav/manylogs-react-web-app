// Main page height responsive height calculation

/**
 * Calculates appropriate height for main page containers
 * @param {*} size
 * @returns
 */
export const calculatePageContainerHeight = (size) => {
  return size === "small" || size === "medium" ? "100%" : "xlarge";
};

/**
 * @param {*} code http status code
 * @returns (grommet) color for given status
 */
export const getStatusCodeColor = (code) => {
  if (code >= 400 && code < 600) {
    return "status-error";
  }
  return "status-ok";
};

/**
 * @param {*} url http url
 * @returns url path
 */
export const getUrlPath = (url) => {
  try {
    const urlParsed = new URL(url);
    return urlParsed.pathname;
  } catch (e) {}
  return "";
};

/**
 * @param {*} timestamp extects a number (not string)
 * @returns formatted timestamp
 */
export const formatTimestampDate = (timestamp) => {
  if (typeof timestamp !== "number") {
    console.log("Unable to parse timestamp: ", timestamp);
    return "";
  }

  try {
    return new Date(timestamp).toLocaleString();
  } catch (error) {
    console.log("Could not parse date: " + timestamp);
  }

  return "";
};
