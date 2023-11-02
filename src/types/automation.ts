export type RecentAutomationTypes = {
  page: number;
  size: number;
  count: number;
  total: number;
  items: AutomationItemTypes[];
};

export type AutomationItemTypes = {
  env_id: number;
  name: string;
  pipeline: string;
  start_stage: string;
  end_stage: string;
  use_excel: boolean;
  id: number;
  excel_file?: string;
  run_count: number;
  progress: number;
  last_run: any;
  created_at: string;
  status: string;
};

export type AutomationDetailsTypes = {
  env_id: number;
  name: string;
  pipeline: string;
  start_stage: string;
  end_stage: string;
  use_excel: boolean;
  id: 0;
  excel_file: string;
  run_count: 0;
  progress: 0;
  last_run: string;
  created_at: string;
  datapoints: Datapoint[];
  messages: Message[]

};


export interface Datapoint {
  field_id: string
  cell_location: string
  id: number
}

export interface Message {
  id: number
  type: string
  content: string
}