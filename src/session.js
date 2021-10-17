export const API_TOKEN = "";

export const createSession = (userId, token, email) => {
  localStorage.setItem("userId", userId);
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
};

export const session = () => {
  return {
    id: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
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
