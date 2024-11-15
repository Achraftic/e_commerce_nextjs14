'use client'

import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import GoogleBtn from "./GoogleBtn"
import { logIn, SignUp } from "@/actions/authAction"
import { LoginAuthSchema, SignUpAuthSchema } from "@/shema/shema"
import { useState } from "react"
import { z } from "zod"
import ButtonSubmit from "./ButtonSubmit"
import { FaOpencart } from "react-icons/fa"

type FormProps = {
    type: "signup" | "signin"
}

type SignUpErrors = z.inferFlattenedErrors<typeof SignUpAuthSchema>;

export default function Form({ type }: FormProps) {
    const [error, setError] = useState<SignUpErrors | undefined>(undefined);
    const [errorServer, setErrorServer] = useState<string | undefined>(undefined);

    const handleAuth = async (formData: FormData) => {
        const authData = Object.fromEntries(formData.entries());

        let validateDataAuth;

        if (type === "signup") {
            validateDataAuth = SignUpAuthSchema.safeParse(authData);
            if (!validateDataAuth.success) {
                setError(validateDataAuth.error.flatten());
                return;
            }
            const resulte = await SignUp(formData);
            setError(undefined)
            if (resulte) {

                setErrorServer(resulte?.message)
            }
        }
        else {
            validateDataAuth = LoginAuthSchema.safeParse(authData);
            if (!validateDataAuth.success) {
                setError(validateDataAuth.error.flatten());
                return;
            }
            const resulte = await logIn(formData);
            setError(undefined)
            setErrorServer(resulte?.message)
        }
    }

    return (
        <>
            <div>

                <FaOpencart className='text-2xl m-auto text-dark dark:text-zinc-50' />
                <h1 className='text-lg mt-2 text-dark dark:text-zinc-50 font-semibold text-center'>
                    {type === "signin" ? "Welcome back" : "Create your account"}
                </h1>
                <p className='text-center text-xs text-zinc-500'>
                    {type === "signin" ? "Please sign in to your account" : "Let's get started with us"}
                </p>
            </div>
            <form className='my-5 px-5' action={handleAuth}>
                <div className='grid gap-3 grid-cols-2'>
                    {type === "signup" && (
                        <div className='gap-1 grid col-span-2'>
                            <Label className='text-dark dark:text-zinc-50 font-semibold'>Username</Label>
                            <Input name="name" className='h-8 text-xs' placeholder='JohnDoe' />
                            <div className='error text-red-500 h-2 text-xs'>
                                <p>{error?.fieldErrors?.name?.at(0)}</p>
                            </div>
                        </div>
                    )}
                    <div className='gap-1 grid col-span-2'>
                        <Label className='text-dark dark:text-zinc-50 font-semibold'>Email</Label>
                        <Input name="email" className='h-8 text-xs' placeholder='JohnDoe@email.com' />
                        <div className='error text-red-500 h-2 text-xs'>
                            <p>{error?.fieldErrors?.email?.at(0)}</p>
                        </div>
                    </div>
                    <div className={`grid gap-1 ${type === "signin" ? "col-span-2" : ""}`}>
                        <Label className='text-dark dark:text-zinc-50 font-semibold'>Password</Label>
                        <Input type='password' name='password' className='h-8 text-xs' placeholder='********' />
                        <div className='error text-red-500 h-2 text-xs'>
                            <p>{error?.fieldErrors?.password?.at(0)}</p>
                        </div>
                    </div>
                    {type === "signup" && (
                        <div className='grid gap-1'>
                            <Label className='text-dark dark:text-zinc-50 font-semibold'>Confirm Password</Label>
                            <Input type='password' name='confirme_password' className='h-8 text-xs' placeholder='********' />
                            <div className='error text-red-500 h-2 text-xs'>
                                <p>{error?.fieldErrors?.confirme_password?.at(0)}</p>
                            </div>
                        </div>
                    )}
                </div>
                <ButtonSubmit type={type} />
                {errorServer && <div className='error text-red-500 h-2 text-xs '>{errorServer}</div>}
            </form>

            <div className='px-5'>
                <div className='flex items-center justify-center text-zinc-50'>
                    <span className='h-px w-full bg-zinc-400/60 dark:bg-zinc-700'></span>
                    <span className="   mb-1 mx-1">or</span>
                    <span className='h-px w-full bg-zinc-400/60 dark:bg-zinc-700'></span>
                </div>

                <GoogleBtn type={type} />

                <p className='text-xs text-zinc-700 mt-2 dark:text-zinc-300  text-center'>
                    {type === "signin" ? "Don't" : "Already"} have an account ? 
                    <Link href={type === "signin" ? '/signup' : '/signin'} className='text-primary ml-0.5 font-semibold'>
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </p>
            </div>
        </>
    );
}

