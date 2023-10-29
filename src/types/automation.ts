export type RecentAutomationTypes = {
    page: number
    size: number
    count: number
    total: number
    items: AutomationItemTypes[]
  }
  
  export type AutomationItemTypes = {
    env_id: number
    name: string
    pipeline: string
    start_stage: string
    end_stage: string
    use_excel: boolean
    id: number
    excel_file?: string
    run_count: number
    progress: number
    last_run: any
      created_at: string
    status: string
  }