import AxoisApi from "../api";
import { APIS } from "../api/api";

export const createEnvironment = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.ENVIRONMENT.CREATE}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getEnvironment = (page: number, size: number) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.ENVIRONMENT.GET_LIST(page, size)}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
