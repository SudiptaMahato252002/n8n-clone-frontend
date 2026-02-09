'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Hero = () => {

    const router=useRouter()
  return (
    <section className='max-w-7xl mx-auto px-4 pt-10 border-b'>
        <div className='flex items-center gap-8'>
            
            <div className=' flex-1 flex flex-col items-center'>
                <div className='text-5xl font-bold text-center pt-4 max-w-md'>
                    Automate as fast as you can type
                </div>
                <div className='text-center pt-4 max-w font-semibold'>
                    <p>
                        AI gives you automation superpowers,and Nodeflow puts them to work. Pairing AI<br/>
                        and Nodeflow helps you turn your ideas int workflow and bots that work for you.
                    </p>    
                </div>    
                <div className='flex p-4 gap-2'>
                    <Button onClick={()=>{
                        router.push('/signup')
                    }}>Get Started free</Button>
                    <Button className='bg-white border-black border text-black hover:text-white'>Contact Sales</Button>
                </div>
            </div>

            <div className='flex-1 relative h-87.5'>
                <Image alt='Hero' src='/asset/icons/hero.avif' fill priority className='object-cover rounded-lg'>
                </Image>
            </div>
        </div>
        <div className='p-4 flex justify-center w-full mt-10'>
                <div className='w-full max-w-xl aspect-video'>
                    <video src="/asset/videos/Hero.mp4" loop muted autoPlay playsInline className='w-full h-full object-cover rounded-xl shadow-lg'></video>
                </div>
        </div>

        

        
        


    </section>
  )
}

export default Hero