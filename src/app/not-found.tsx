import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='text-zinc-50 text-center bg-primary h-screen w-full flex flex-col gap-1.5 justify-center items-center'>
      <h2 className='lg:text-6xl md:text-4xl text-2xl'>Not Found Page</h2>
      <p className='text-zinc-200 text-base'>Could not find requested resource</p>
      <Link href="/" className='bg-zinc-800 px-5 p-3 text-zinc-50 rounded-md'>Back Home</Link>
    </div>
  )
}