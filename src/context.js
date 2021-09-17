export const API_TOKEN = "";

export const session = () => {
  return {
    id: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
  };
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  return token && id;
};

export const clearUserSession = () => {
  localStorage.clear();
};
