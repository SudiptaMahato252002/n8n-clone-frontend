export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  enabled: boolean;
  createdAt: string;
  lastLogin: string|null;
}
export interface LoginRequest  {
  email: string;
  password: string;
};

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
};

export interface AuthResponse{
    accessToken: string,
    refreshToken: string,
    type: 'Bearer',
    expiresIn: number,
    user: User
}


export interface CreateCredentilasRequest
{
    title: string,
    platform: 'RESEND_EMAIL'|'GEMINI'|'TELEGRAM'|'GROQ_AI'
    credentials: Record<string,any>
}

export interface CredentialsResponse
{
    id: string,
    userId: string,
    title: string,
    platform: string,
    createdAt: string,
    updatedAt: string
}
export enum Platform
{
    WEBHOOK='WEBHOOK',
    GROQ_AI='GROQ_AI',
    RESEND_EMAIL='RESEND_EMAIL'

}
export type WorkflowNodePayload={
  id: string,
  label: string,
  credentialsId?:string,
  type:Platform,
  position:{
    x:number,
    y:number
  },
  config:any
}