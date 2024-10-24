import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import { LoginWithGoogle } from '@/actions/authAction'

export default function GoogleBtn({ type }: { type: "signin" | "signup" }) {
    return (
        <form action={LoginWithGoogle}>
            <Button type='submit' className='my-5 w-full text-black bg-neutral-200/50 '>  <FcGoogle className='mr-2 ' size={17} />  {type == "signin" ? "Sign in" : "Sign up "} with Google</Button>
        </form>
    )
}
