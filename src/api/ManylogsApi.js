import axios from "axios";

const PATH_SIGNIN = "/signin";

export const client = axios.create({
  baseURL: "http://www.localhost:8080/api/v1",
  timeout: "1000",
  crossDomain: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// interceptor
client.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const requestSignin = (email, password, onSuccess, onError) => {
  client
    .post(PATH_SIGNIN, {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data) {
        console.log("Setting authentication data...");
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);
        onSuccess();
      }
    })
    .catch((error) => {
      if (error.response) {
        const data = error.response.data;
        const code = error.response.status;
        var message = "Error";
        if (code == 401) message = "Invalid credentials";
        else if (code == 400) message = "Invalid data";
        onError(message);
      }
    });
};
