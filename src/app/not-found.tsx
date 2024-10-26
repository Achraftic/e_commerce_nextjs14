import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='text-zinc-9000 text-center bg-zinc-50 h-[60vh] w-full flex flex-col gap-1.5 justify-center items-center'>
      <h2 className=' md:text-5xl text-2xl font-semibold'>Not Found Page</h2>
      <p className='text-zinc-400 text-sm'>Could not find requested resource</p>
      <Link href="/" className='bg-zinc-800 px-5 p-1.5 hover:bg-zinc-700  text-zinc-50 rounded-md'>Back Home</Link>
    </div>
  )
}