import axios from "axios";

function getToken() {
  let token = localStorage.getItem("high_level_token") ?? null;
  return token;
}

let AxoisApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
});

AxoisApi.defaults.headers.common = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
};

AxoisApi.interceptors.response.use(
  function (response) {
    let datares = response.data;
    if (typeof datares == "object") {
      if (
        Number(datares?.status) === 400 ||
        Number(datares?.status) === 401 ||
        Number(datares?.status) === 500
      ) {
        return Promise.reject(response);
      }
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

AxoisApi.interceptors.request.use(function (config) {
  if (getToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }

  return config;
});

export default AxoisApi;
