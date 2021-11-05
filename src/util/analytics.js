const getAnalytics = () => {
  return window.analytics;
};

export const events = {
  identify: (userId, email) =>
    getAnalytics().identify(userId, { email: email }),
  login: (success) => getAnalytics().track("Login", { success: success }),
  signup: (success) => getAnalytics().track("Signup", { success: success }),
};
