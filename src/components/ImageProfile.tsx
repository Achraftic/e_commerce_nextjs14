import { auth } from '@/auth.config'
import React from 'react'
import { DropDown } from './DropDown'
import Image from 'next/image'
import Link from 'next/link'
import { IoChevronForward } from 'react-icons/io5'

export default async function ImageProfile() {
    const session = await auth()
  return (
    <>
        {session?.user ?
          <DropDown>
            <Image src={session?.user?.image as string} width={30} height={30} alt="user image" className='rounded-full  cursor-pointer' />
          </DropDown>
          :
          <Link href="/signin" className="bg-slate-400 cursor-pointer  bg font-semibold group  bg-opacity-10 rounded-full w-max px-3 py-2 flex items-center space-x-2 ">Sign in
           <IoChevronForward  />
          </Link>

        }
    </>
  )
}
