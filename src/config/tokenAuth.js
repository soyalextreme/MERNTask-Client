import clientAxios from "./axios";

export const tokenAuth = (token) => {
  if (token) {
    clientAxios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete clientAxios.defaults.common["x-auth-token"];
  }
};
