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
  last_login: string;
  created_at: string;
};
