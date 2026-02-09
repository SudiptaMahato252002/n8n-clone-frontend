'use client'
import { api, clearAuthTokens, isAuthenticated } from '@/lib/axios';
import { authApi } from '@/services/auth.service';
import { LoginRequest, SignUpRequest, User } from '@/types'
import { useRouter } from 'next/navigation';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

interface AuthContextType
{
    user: User|null;
    login: (credentials: LoginRequest)=>Promise<void>
    signup: (data:SignUpRequest)=>Promise<void>
    logout:()=>Promise<void>
    isAuthenticated: boolean
    isLoading: boolean
    error:string|null
    clearError:()=>void

}


const AuthContext=createContext<AuthContextType|undefined>(undefined)

export function AuthProvider({children}:{children:ReactNode})
{
    const [user, setUser] = useState<User|null>(null)
    const [isLoading,setIsLoading]=useState(true)
    const [error,setError]=useState<string|null>(null)

    const router=useRouter()
    
    const clearError=()=>{
        setError(null)
    }


    useEffect(()=>{
        const loadUser=()=>{

            try 
            {
                if(!isAuthenticated())
                {
                    setIsLoading(false)
                    return;
                }

                const storedUser=localStorage.getItem('user')
                if(storedUser)
                {
                    setUser(JSON.parse(storedUser))
                }    
            } 
            catch (error) 
            {
                console.error('Failed to load user:', error);
                clearAuthTokens();
            }
            finally
            {
                 setIsLoading(false);
            }
        }
        loadUser()
    },[])

    const login=useCallback(async (credentials:LoginRequest)=>{
        try 
        {
            setIsLoading(true)
            const response=await authApi.login(credentials)
            setUser(response.user)
            router.push("/dashboard")
        } 
        catch (error:any) 
        {
            console.error('Login failed:', error);
            setError(error?.message || 'Invalid credentials')
            throw error;
        }
        finally
        {
            setIsLoading(false)
        }

    },[router])
    
    const signup=useCallback(async (data:SignUpRequest)=>{
        try 
        {
            setIsLoading(true)
            const response=await authApi.signUp(data)
            setUser(response.user)            
        } 
        catch (error:any) 
        {
            console.error('Signup failed:', error);
            setError(error?.message || 'Invalid credentials')
            throw error;   
        }

    },[router])
    
    const logout=useCallback(async()=>{
        try 
        {
            setIsLoading(true)
            await authApi.logout()
            
        } 
        catch (error:any) 
        {
            console.error('Logout error:', error);
            setError(error?.message || 'Invalid credentials')
        }
        finally
        {
            setUser(null);
            setIsLoading(false);
            router.push('/login')
        }

    },[router])

    const value:AuthContextType={
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user && isAuthenticated(),
        isLoading,
        error,
        clearError
    }

    return <AuthContext.Provider value={value}></AuthContext.Provider>

}

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if(context== undefined)
    {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}