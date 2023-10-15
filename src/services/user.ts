import AxoisApi from "../api";
import { APIS } from "../api/api";

export const userlogin = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.USER.LOGIN}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createUser = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.USER.USER}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUser = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.USER.USER}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getProfile = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.USER.PROFILE}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
