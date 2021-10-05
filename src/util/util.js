// Main page height responsive height calculation
export const calculatePageContainerHeight = (size) => {
  return size === "small" || size === "medium" ? "100%" : "xlarge";
};
