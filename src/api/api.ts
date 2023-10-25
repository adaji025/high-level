const api: string = import.meta.env.VITE_APP_API!;

export const APIS = {
  USER: {
    LOGIN: `${api}/user/login`,
    USER: `${api}/user/create`,
    USER_LIST: (page: number, size: number) =>
      `${api}/user/list?page=${page}&size=${size}`,
    USER_CHANGE_PASSWORD: `${api}/user/password/change`,
    USER_UPDATE_PROFILE: `${api}/user/update`,
    DEACTIVATE: (id: number) => `${api}/user/activate/${id}/`,
    ACTIVATE: (id: number) => `${api}/user/deactivate/${id}/`,
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
    UPDATE: (id: number) => `${api}/environment/edit/${id}`,
    DELETE: (id: number) => `${api}/environment/delete/${id}`,
    GET_AUTOMATION: (id: string, page: number, size: number) =>
      `${api}/environment/${id}/automation/list?page=${page}&size=${size}`,
  },
  AUTOMATION: {
    LIST: (order_by: string, page: number, size: number) =>
      `${api}/automation/list?order_by=${order_by}&page=${page}&size=${size}`,
  },
};
