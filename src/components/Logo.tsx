import React from 'react'
import { FaOpencart } from 'react-icons/fa'

export default function Logo() {
  return (
    <h1 className="flex gap-1.5 w-max text-lg items-center font-semibold ">
      <FaOpencart className='text-2xl m-auto text-primary' />
      <span>

        Electro<span className="text-primary">Hub</span>
      </span>
      </h1>
  )
}
