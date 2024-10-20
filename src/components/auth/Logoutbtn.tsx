

import { Logout } from '@/actions/authAction'
import React from 'react'

export default function Logoutbtn() {

  return (
    <form className=' w-full'  action={Logout}>
      <button className='border-none w-full text-start ' type='submit'>
        Log out
      </button>
    </form>
  )
}
