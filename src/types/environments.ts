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