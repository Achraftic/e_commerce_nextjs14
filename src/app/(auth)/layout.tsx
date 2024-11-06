import { ModeToggle } from '@/components/ModeToggle'
import React from 'react'

export default function layout({ children }: { children: React.ReactElement }) {
    return (
        <div className='grid place-items-center h-screen'>

           <div className='absolute top-5 right-5'>

            <ModeToggle/> 
           </div>
            <div className='min-h-[400px] grid p-5  bg-zinc-100/80 dark:bg-zinc-800  w-[400px] rounded-lg shadow-xl shadow-zinc-100 dark:shadow-zinc-800 dark:shadow  '>
                {children}

            </div>


        </div>
    )
}
