import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL='http://localhost:8080'

export const api:AxiosInstance=axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})


api.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    const token=localStorage.getItem('access_token')
    if(token && config.headers)
    {

        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
},
(error)=>Promise.reject(error))

api.interceptors.response.use(
    (response:AxiosResponse)=>response,
    (error)=>{
        return Promise.reject(error)
    }
)

const handleLogout=()=>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    delete api.defaults.headers.common.Authorization;

    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) 
    {
        window.location.href = '/login';
    }

}

export const setAuthTokens=(accessToken: string,refreshToken: string)=>{
    localStorage.setItem('access_token',accessToken)
    localStorage.setItem('refresh_token',refreshToken)
    api.defaults.headers.common.Authorization=`Bearer ${accessToken}`
}

export const getAccessToken=():string|null=>{
    return localStorage.getItem('access_token')
}

export const getRefreshToken=():string|null=>{
    return localStorage.getItem('refresh_token')
}

export const clearAuthTokens=()=>{
    handleLogout();
}

export const isAuthenticated=():boolean=>{
    return !!localStorage.getItem('access_token')
}