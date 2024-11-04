import React from 'react'
import ImageProfile from '../ImageProfile'
import { ModeToggle } from '../ModeToggle'

export default function HeaderDashboard() {
  return (
    <div className='flex justify-between border-b items-center border-zinc-200/50 dark:border-zinc-700/50 p-5'>
      <div className='text-zinc-500 dark:text-zinc-300'>
        {new Date().toUTCString().slice(0, 16)}
      </div>
      <div className='flex gap-4 items-center'>

      <ModeToggle />
      <ImageProfile />
      </div>
    </div>
  )
}
