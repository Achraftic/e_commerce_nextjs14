
import { signOut } from '@/auth.config'
import React from 'react'

export default function Logoutbtn() {

  return (
    <form
    className=' w-full'
      action={async () => {
        "use server"
        await signOut()
        

      }}
    >
      <button className='border-none w-full text-start ' type='submit'>
        Log out
      </button>
    </form>
  )
}
