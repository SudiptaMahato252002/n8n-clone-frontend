import { api } from "@/lib/axios"
import { CreateCredentilasRequest, CredentialsResponse } from "@/types"

const BASE_PATH='/api/credentials'

export const credentialsApi={
    create: async(userId: string,data: CreateCredentilasRequest):Promise<CredentialsResponse>=>{
        const response=await api.post<CredentialsResponse>(`${BASE_PATH}/${userId}`,data)
        return response.data
    },
    getAll: async(userId: string):Promise<CredentialsResponse[]>=>{
        const response=await api.get<CredentialsResponse[]>(`${BASE_PATH}/${userId}`)
        return response.data
    },
    getById: async(id: string, userId: string): Promise<CredentialsResponse>=>{
        const response= await api.get<CredentialsResponse>(`${BASE_PATH}/${id}/${userId}`)
        return response.data
    },
    delete: async (id: string, userId: string): Promise<void>=>{
        await api.delete(`${BASE_PATH}/${id}/${userId}`)
    }

}