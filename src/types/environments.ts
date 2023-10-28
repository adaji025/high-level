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




export type PipelineTypes = {
  id: string
  name: string
  stages: StageTypes[]
  locationId: string
}

export type StageTypes = {
  id: string
  name: string
}

export type CustomFieldProps =  {
  
    id: string
    name: string
    fieldKey: string
    placeholder: string
    dataType: string
    position: number
 
}

export type AutomationResponseTypes = {
  env_id: number
  name: string
  pipeline: string
  start_stage: string
  end_stage: string
  use_excel: boolean
  id: number
  excel_file: any
  run_count: number
  progress: number
  last_run: any
  created_at: string
  datapoints: Datapoint[]
}

export interface Datapoint {
  field_id: string
  cell_location: string
  id: number
}
