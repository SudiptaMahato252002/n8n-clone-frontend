import { api } from "@/lib/axios"

const BASE_PATH='/api/workflows'

export interface CreateWorkflowRequest
{
    title: string
    triggerType: 'WEBHOOK' | 'MANUAL' | 'SCHEDULE' | 'SUB_WORKFLOW'
    nodes: Record<string, any>
    connections: Record<string, string[]>
    webhook?: {
        id: string
        title: string
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
        secret: string
    }
}

export interface UpdateWorkflowRequest
{
    title: string
    triggerType: 'WEBHOOK' | 'MANUAL' | 'SCHEDULE' | 'SUB_WORKFLOW'
    nodes: Record<string,any>
    connections: Record<string,any>
    webhook?:{
        id: string
        title: string
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
        secret: string
    }
  }

export interface WorkflowResponse 
{
  id: string
  userId: string
  title: string
  enabled: boolean
  triggerType: 'MANUAL'|'WEBHOOK'|'SCHEDULE'
  nodes: Record<string, any>
  connections: Record<string, string[]>
  webhookId: string
  webhook: {
    id: string
    title: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    secret: string
    createdAt: string
  }
  executionCount: number
  createdAt: string
  updatedAt: string
}

export interface TriggerWorkflowRequest {
  input: Record<string, any>
}


export const workflowApi = {
  create: async (userId: string, data: CreateWorkflowRequest): Promise<WorkflowResponse> => {
    console.log(JSON.stringify(data))
    const response = await api.post<WorkflowResponse>(`${BASE_PATH}/${userId}`, data)
    return response.data
  },

  update:async(userId:string,data:UpdateWorkflowRequest,id:string)=>{
    const response=await api.put<WorkflowResponse>(`${BASE_PATH}/${id}/${userId}`)
    return response.data
  },

  getAll: async (userId: string): Promise<WorkflowResponse[]> => {
    const response = await api.get<WorkflowResponse[]>(`${BASE_PATH}/${userId}`)
    return response.data
  },

  getById: async (id: string, userId: string): Promise<WorkflowResponse> => {
    const response = await api.get<WorkflowResponse>(`${BASE_PATH}/${id}/${userId}`)
    return response.data
  },

  delete: async (id: string, userId: string): Promise<void> => {
    await api.delete(`${BASE_PATH}/${id}/${userId}`)
  },

  trigger: async (id: string, userId: string, data: TriggerWorkflowRequest): Promise<any> => {
    const response = await api.post(`${BASE_PATH}/${id}/${userId}/trigger`, data)
    return response.data
  }
}


