import { ModeToggle } from '@/components/ModeToggle'
import React from 'react'

export default function layout({ children }: { children: React.ReactElement }) {
    return (
        <div className='grid place-items-center h-screen     ' >



            <div className='absolute top-5 right-5'>

                <ModeToggle />
            </div>
            <div className='min-h-[400px] grid p-5  z-50 dark:bg-neutral-900 bg-zinc-100/70  w-[400px] relative rounded-lg   '>
                <div className='z-10'>
                    <div className="absolute top[calc(20%-32px] left-10 w-28 h-28 rounded-full bg-gradient-to-br from-yellow-500/60  to-pink-600 /50 shadow-glow filter blur-3xl "></div>
                    <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 shadow-glow filter blur-3xl "></div>
                    <div className="absolute bottom-1/4 right-3 w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-violet-800 shadow-glow filter blur-3xl "></div>

                </div>
                <div className='z-50'>

                    {children}
                </div>

            </div>


        </div>
    )
}
