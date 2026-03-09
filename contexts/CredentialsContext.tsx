'use client'
import { CredentialsResponse } from "@/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


interface CredentialContextType
{
    credentials:CredentialsResponse[]
    setCredentials:Dispatch<SetStateAction<CredentialsResponse[]>>
}

const CredentialsContext=createContext<CredentialContextType|undefined>(undefined)

export function CredentialsProvider({children}:{children:ReactNode})
{
    const [credentials,setCredentials]=useState<CredentialsResponse[]>([])

    return(

        <CredentialsContext.Provider value={{credentials,setCredentials}}>
            {children}
        </CredentialsContext.Provider>
    )
}

export const useCredentials=()=>{
    const context=useContext(CredentialsContext)
    if(!context)
    {
        throw new Error('useCredentials must be used inside CredentialsProvider')
    }
    return context
}