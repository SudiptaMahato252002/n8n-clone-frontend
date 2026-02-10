import { api } from "@/lib/axios"

const BASE_PATH='/api/workflows'

export interface CreateWorkflowRequest
{
    title: string
    triggerType: 'WEBHOOK' | 'MANUAL' | 'SCHEDULE' | 'SUB_WORKFLOW'
    nodes: Record<string, any>
    connections: Record<string, string[]>
    webhook: {
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
  triggerType: string
  nodes: Record<string, any>
  connections: Record<string, string[]>
  webhookId: string
  webhook: {
    id: string
    title: string
    method: string
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
    const response = await api.post<WorkflowResponse>(`${BASE_PATH}/${userId}`, data)
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


