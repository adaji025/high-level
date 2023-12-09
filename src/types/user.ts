export type UserState = {
  page: number;
  size: number;
  count: number;
  total: number;
  items: UserTypes[];
};

export type UserTypes = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  last_login: string;
  created_at: string;
};

export type UserCredentialTypes = {
  id: number | null;
  user_id: number | null;
  sendgrid_api_key: "";
  sendgrid_email: "";
  sendgrid_email_subject: "";
  twilio_account_sid: "";
  twilio_auth_token: "";
  twilio_sms_phone_number: "";
};
