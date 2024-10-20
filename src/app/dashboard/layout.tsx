import HeaderDashboard from '@/components/dashboard/HeaderDashboard'
import SideBar from '@/components/dashboard/SideBar'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen md:px-4   md:gap-4  grid grid-cols-[auto,_1fr]  '>
      <SideBar />
      <div className='shadow-2xl shadow-zinc-200/70 className="  w-full mx-auto  overflow-x-auto '>
        <HeaderDashboard/>
        <div className='px-6'>
        {children}
        </div>
      </div>
    </div>
  )
}
