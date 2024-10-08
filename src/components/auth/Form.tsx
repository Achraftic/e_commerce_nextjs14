import logo from "@/public/image.png"
import Image from 'next/image'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

type FormProps = {
    type: "signup" | "signin"
}
export default function Form({ type }: FormProps) {
    return (
        <>
            <div>


                <Image src={logo} alt='logo' className='m-auto' width={30} height={30} />
                <h1 className='text-lg mt-5 text-dark  font-semibold text-center'> {type === "signin" ? " Welcome back" : "Create your account"}</h1>
                <p className=' text-center text-zinc-500'> {type === "signin" ? "Please sign in to your account" : "Lets get started white us "}   </p>
            </div>
            <form className='my-5 px-5'>


                <div className=' grid gap-3 grid-cols-2'>
                    <div className='  gap-1 grid col-span-2 '>
                        <Label className='text-dark font-semibold'>Username</Label>
                        <Input className='h-8 text-xs' placeholder='JohnDoe' />
                        <div className='error text-red-500 h-2 text-xs'>
                            {/* <p> Error message </p> */}
                        </div>

                    </div>
                    {
                        type === "signup" && <div className='  gap-1 grid col-span-2 '>
                            <Label className='text-dark font-semibold'>Email</Label>
                            <Input className='h-8 text-xs' placeholder='JohnDoe@email.com' />
                            <div className='error text-red-500 h-2 text-xs'>
                                {/* <p> Error message </p> */}
                            </div>

                        </div>
                    }



                    <div className={`grid gap-1 ${type === "signin" ? "col-span-2" : ""}`}>
                        <Label className='text-dark font-semibold'>Password</Label>
                        <Input type='password' name='password' className='h-8 text-xs' placeholder='********' />
                        <div className='error text-red-500 h-2 text-xs'>
                            {/* <p> Error message </p> */}
                        </div>

                    </div>
                    {
                        type === "signup" && <div className={`grid gap-1 }`}>
                            <Label className='text-dark font-semibold'>Confirme password</Label>
                            <Input type='password' name='password' className='h-8 text-xs' placeholder='********' />
                            <div className='error text-red-500 h-2 text-xs'>
                                {/* <p> Error message </p> */}
                            </div>

                        </div>
                    }

                </div>
                <Button className='w-full my-3'>  {type==="signin" ? "Sign in" : "Sign up"} </Button>
            </form>
            <div className='px-5'>
                <div className='flex  items-center text-zinc-300'>
                    <span className='h-px w-full bg-zinc-200'></span>
                    <span>or</span>
                    <span className='h-px w-full bg-zinc-200'></span>
                </div>

                <Button className='my-5 w-full text-black bg-neutral-200/50 '>  <FcGoogle className='mr-2 ' size={17} />  {type == "signin" ? "Sign in" : "Sign un "} with Google</Button>
                <p className='text-xs text-zinc-400 mt-2 text-center'> {type == "signin" ? "Don't " : "Already "} have an account? <Link href={type == "signin" ? '/signup' : '/signin'} className='text-primary font-semibold'>Sign up</Link>  </p>
            </div>
        </>
    )
}
