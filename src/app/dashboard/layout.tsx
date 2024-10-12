import SideBar from '@/components/dashboard/SideBar'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen md:px-4  md:py-4 py-2 md:gap-4  grid grid-cols-[auto,_1fr]  '>
      <SideBar />
      <div className='shadow-2xl shadow-zinc-200/70 '>
        {children}
      </div>
    </div>
  )
}
