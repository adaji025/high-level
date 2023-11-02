const api: string = import.meta.env.VITE_APP_API!;

export const APIS = {
  USER: {
    LOGIN: `${api}/user/login`,
    USER: `${api}/user/create`,
    GET_USER: `${api}/user/`,
    USER_LIST: (page: number, size: number) =>
      `${api}/user/list?page=${page}&size=${size}`,
    USER_CHANGE_PASSWORD: `${api}/user/password/change`,
    USER_UPDATE_PROFILE: `${api}/user/edit`,
    DEACTIVATE: (id: number) => `${api}/user/deactivate/${id}/`,
    ACTIVATE: (id: number) => `${api}/user/activate/${id}/`,
  },
  AUTH: {
    RESET_PASSWORD: `${api}/auth/reset-password`,
    FORGOT_PASSWORD: `${api}/auth/forgot-password`,
    VERIFY_USER: `${api}/auth/verify`,
    SEND_OTP: `${api}/auth/verify-otp`,
  },
  ENVIRONMENT: {
    CREATE: `${api}/environment/create`,
    GET_LIST: (page: number, size: number) =>
      `${api}/environment/list?page=${page}&size=${size}`,
    UPDATE: (id: number) => `${api}/environment/edit/${id}/`,
    DELETE: (id: number) => `${api}/environment/delete/${id}/`,
    GET_AUTOMATION: (id: string, page: number, size: number) =>
      `${api}/environment/${id}/automation/list?page=${page}&size=${size}`,
    SINGLE_ENV: (id: number, page: number, size: number) =>
      `${api}/environment/${id}/automation/list?page=${page}&size=${size}`,
  },
  AUTOMATION: {
    LIST: (order_by: string, page: number, size: number) =>
      `${api}/automation/list?order_by=${order_by}&page=${page}&size=${size}`,
    CREATE_AUTOMATION: `${api}/automation/create`,
    UPLOAD_EXCEL: (id: number) => `${api}/automation/${id}/upload/excel`,
    AUTOMATION_DETAILS: (id: number) => `${api}/automation/${id}/`,
    RUN: (id: number) => `${api}/automation/${id}/run`,
    DELETE: (id: number) => `${api}/automation/delete/${id}/`,
    UPDATE_MESSAGE: `${api}/automation/message/edit/`,
    UPDATE_DATAPOINTS: `${api}/automation/datapoint/edit/`,
  },
};
