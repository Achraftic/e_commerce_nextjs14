
import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

export default function Loading() {
  return (
    <div className='h-[80vh] w-full grid place-items-center'>

       <AiOutlineLoading className=" text-primary  h-16 w-16 animate-spin" />
    </div>
  )
}
