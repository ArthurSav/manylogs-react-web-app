import axios from "axios";
import { createSession } from "../session";
import { events } from "../util/analytics";

const HOST = process.env.REACT_APP_API_ENDPOINT;
const PATH_SIGNIN = "/signin";
const PATH_SIGNUP = "/signup";
const PATH_APPS_PROFILE = "/apps/profile";
const PATH_PROFILE_LOG = "/profile-log";

export const client = axios.create({
  baseURL: `${HOST}/api/v1`,
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
      events.login(true);
      if (response.data) {
        const userId = response.data.userId;
        const userToken = response.data.token;
        createSession(userId, userToken, email);
        events.identify(userId, email);
        onSuccess();
      }
    })
    .catch((error) => {
      events.login(false);
      if (error.response) {
        // const data = error.response.data;
        const code = error.response.status;
        var message = "Error";
        if (code === 401 || code === 400) message = "Invalid credentials";
        onError(message);
      }
    });
};

export const requestSignup = (name, email, password, onSuccess, onError) => {
  client
    .post(PATH_SIGNUP, {
      name: name,
      email: email,
      password: password,
    })
    .then((response) => {
      events.signup(true);
      if (response.data) {
        const userId = response.data.userId;
        const userToken = response.data.token;
        createSession(userId, userToken, email);
        events.identify(userId, email);
        onSuccess();
      }
    })
    .catch((error) => {
      console.log(error.response);
      events.signup(false);
      if (error.response) {
        const data = error.response.data;
        const code = error.response.status;

        var message = "";
        switch (data) {
          case "EMAIL_EXISTS":
            message = "Email already exists";
            break;
          case "EMAIL_INVALID_FORMAT":
            message = "Invalid email";
            break;
          case "FULL_NAME_EMPTY":
            message = "Name required";
            break;
          case "PASSWORD_INVALID_MIN_LIMIT":
            message = "Password length should be 6 chars or more";
            break;
          default:
            message = "Something went wrong";
        }

        onError(message);
      }
    });
};

export const createHttpProfile = ({ body, onLoading, onSuccess, onError }) => {
  onLoading(true);
  client
    .post(PATH_APPS_PROFILE, { appId: body.appId, profileName: body.name })
    .then((response) => {
      console.log(response);
      if (response.data) {
        onSuccess(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
      onError("Something went wrong.");
    })
    .finally(() => {
      onLoading(false);
    });
};

export const deleteHttpProfile = ({ body, onLoading, onSuccess, onError }) => {
  onLoading(true);
  client
    .delete(PATH_APPS_PROFILE, {
      data: { appId: body.appId, profileId: body.profileId },
    })
    .then((response) => {
      onSuccess();
    })
    .catch((error) => {
      console.log(error);
      onError("Something went wrong.");
    })
    .finally(() => {
      onLoading(false);
    });
};

export const updateProfileLog = ({ body, onSuccess, onError }) => {
  client
    .put(PATH_PROFILE_LOG, body)
    .then((response) => {
      onSuccess();
    })
    .catch((error) => {
      console.log(error);
      onError("Something went wrong.");
    })
    .finally(() => {});
};
