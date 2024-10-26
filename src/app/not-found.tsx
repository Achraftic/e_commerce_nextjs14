import { cn } from '@/lib/utils'
import Link from 'next/link'
 
export default function NotFound({height="h-[90vh]"}: {height?: string}) {
  return (

    <div className={cn("flex flex-col items-center justify-center gap-2", height)}>
      <h2 className=' md:text-5xl text-2xl font-semibold'>Not Found Page</h2>
      <p className='text-zinc-400 text-sm'>Could not find requested resource</p>
      <Link href="/" className='bg-zinc-800 px-5 p-1.5 hover:bg-zinc-700  text-zinc-50 rounded-md'>Back Home</Link>
    </div>
  )
}