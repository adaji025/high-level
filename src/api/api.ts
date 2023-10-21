const api: string = import.meta.env.VITE_APP_API!;

export const APIS = {
  USER: {
    LOGIN: `${api}/user/login`,
    USER: `${api}/user/create`,
    USER_LIST: (page: number, size: number) =>
      `${api}/user/list?page=${page}&size=${size}`,
    USER_CHANGE_PASSWORD: `${api}/user/password/change`,
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
  },
};
