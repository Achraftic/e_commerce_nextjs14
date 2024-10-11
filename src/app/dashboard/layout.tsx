import SideBar from '@/components/dashboard/SideBar'
import React from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='  bg-zinc-100 min-h-screen   py-4 md:gap-4  grid grid-cols-[auto,_1fr]  '>
        
        <SideBar />
        {children}
      

    </div>
  )
}
