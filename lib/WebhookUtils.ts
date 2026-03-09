import { btoa } from "buffer"

export const generateWebhookId=async(userId: string):Promise<string>=>{
    const timestamp=Date.now().toString()
    const randomUUID=crypto.randomUUID()
    const randomValue=Math.random().toString(36).substring(2,15)

    const input = `${userId}-${timestamp}-${randomUUID}-${randomValue}`

    const encoder=new TextEncoder()
    const data=encoder.encode(input)
    const hashBuffer=await crypto.subtle.digest('SHA-256',data)

    const hashArray=Array.from(new Uint8Array(hashBuffer))
    // const hashBase64=btoa(String.fromCharCode(...hashArray))
    //     .replace(/\+/g,'-')
    //     .replace(/\//g,'_')
    //     .replace(/=/g,'')
    const hashBase64 = Buffer
        .from(hashBuffer)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')


    return hashBase64.substring(0,32)

}

export const generateWebhookSecret=():string=>{
    const uuid = crypto.randomUUID()
  return `wh_${uuid.replace(/-/g, '')}`
}


export const isValidWebhookId = (id: string): boolean => {
  // Should be 32 characters, URL-safe base64
  const webhookIdPattern = /^[A-Za-z0-9_-]{32}$/
  return webhookIdPattern.test(id)
}






