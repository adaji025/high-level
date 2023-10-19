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

export const getUserList = () => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.USER.USER_LIST}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

