'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { AiOutlineLoading } from 'react-icons/ai'

type SubmitBtnProps={
    name?:string
}
export default function SubmitBtn({name}:SubmitBtnProps) {
  const {pending}=useFormStatus()
    return (
        <Button disabled={pending} type="submit" className="btn-primary py-2 px-5 bg-primary text-white font-semibold  ">
            {pending && <AiOutlineLoading className="animate-spin mr-2"/>}
           {name ?name:"Submit"} 
        </Button>
    )
}
