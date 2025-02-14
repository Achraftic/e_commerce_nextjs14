"use client"
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { LuLoader2 } from "react-icons/lu";

export default function ButtonSubmit({ type }: { type: "signin" | "signup" }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className='w-full my-3'>

      {pending && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
      {type === "signin" ? "Sign in" : "Sign up"}

    </Button>
  )
}
