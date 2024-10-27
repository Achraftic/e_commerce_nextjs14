import React from 'react'
import ImageProfile from '../ImageProfile'

export default function HeaderDashboard() {
  return (
    <div className='flex justify-between border-b items-center border-zinc-200/50 p-5'>
      <div className='text-zinc-500'>

      {new Date().toUTCString().slice(0, 16)}
      </div>
    <ImageProfile/>
    </div>
  )
}
