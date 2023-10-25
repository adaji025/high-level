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

export const changePassword = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.USER.USER_CHANGE_PASSWORD}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateProfile = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.USER.USER_UPDATE_PROFILE}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deactivateUser = (id: number) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.USER.DEACTIVATE(id)}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const  activateUser = (id: number) => {
  return new Promise((resolve, reject) => {
    AxoisApi.put(`${APIS.USER.ACTIVATE(id)}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};



export const getUserList = (page: number, size: number) => {
  return new Promise((resolve, reject) => {
    AxoisApi.get(`${APIS.USER.USER_LIST(page, size)}`)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
