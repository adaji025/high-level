const api: string = import.meta.env.VITE_APP_API!;

export const APIS = {
  USER: {
    LOGIN: `${api}/user/login`,
    USER: `${api}/user`,
  },
  AUTH: {
    RESET_PASSWORD: `${api}/auth/reset-password`,
    FORGOT_PASSWORD: `${api}/auth/forgot-password`,
    VERIFY_USER: `${api}/auth/verify`,
    SEND_OTP: `${api}/auth/verify-otp`,
  },
};
