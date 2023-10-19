export type EnvironmentState = {
  page: number;
  size: number;
  count: number;
  items: EnvironmentType[];
};

export type EnvironmentType = {
  agency: string;
  api_key: string;
  id: number;
};
