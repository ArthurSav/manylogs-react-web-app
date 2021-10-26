const getAnalytics = () => {
  console.log("analytics: ", window.analytics);
  return window.analytics;
};

export const events = {
  identify: (userId, email) =>
    getAnalytics().identify(userId, { email: email }),
  login: (success) => getAnalytics().track("Login", { success: success }),
};
