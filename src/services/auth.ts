import AxoisApi from "../api";
import { APIS } from "../api/api";

export const verifyOTP = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTH.VERIFY_USER}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const forgotPassword = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTH.FORGOT_PASSWORD}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const resetPassword = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.patch(`${APIS.AUTH.RESET_PASSWORD}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendOtp = (data: any) => {
  return new Promise((resolve, reject) => {
    AxoisApi.post(`${APIS.AUTH.SEND_OTP}`, data)
      .then((res: any) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
