import { api, clearAuthTokens, getRefreshToken, setAuthTokens } from "@/lib/axios"
import { AuthResponse, LoginRequest, SignUpRequest } from "@/types"

const BASE_PATH='/api/auth'

export const authApi={
    signUp:async(data: SignUpRequest):Promise<AuthResponse>=>{
        const response=await api.post<AuthResponse>(`${BASE_PATH}/signup`,data)
        if(response.data.accessToken && response.data.refreshToken)
        {
            setAuthTokens(response.data.accessToken,response.data.refreshToken)
            localStorage.setItem('user',JSON.stringify(response.data.user))
        }
        return response.data;
    },
    
    login:async(data: LoginRequest):Promise<AuthResponse>=>{
        const response=await api.post<AuthResponse>(`${BASE_PATH}/login`,data)
        if(response.data.accessToken&&response.data.refreshToken)
        {
            setAuthTokens(response.data.accessToken,response.data.refreshToken)
            localStorage.setItem('user',JSON.stringify(response.data.user))
        }
        return response.data;
    },
    logout: async():Promise<void>=>{
        const refreshToken=getRefreshToken()
        try 
        {
            if(refreshToken)
            {
                api.post(`${BASE_PATH}/logout`,{refreshToken})

            }
        } 
        catch (error) 
        {
            console.error('Logout error:', error);
        }
        finally
        {
            clearAuthTokens()
        }
    }
}