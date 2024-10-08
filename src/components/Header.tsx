import Link from 'next/link'
import React from 'react'
import CartButton from './CartButton'


export default function Header() {
  return (
    <header className="flex justify-between items-center py-5 px-10 text-sm  text-black">
    <h1 className="flex text-base items-center space-x-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className="w-10 text-primary">
        <path  strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
      
       Electropack</h1>

    <ul className=" space-x-5 hidden md:flex ">
      <Link href="/" className="font-semibold text-primary">Home</Link>
      <Link href="/products" className=" hover:text-primary transition duration-200">Products</Link>


      
      <li className=" hover:text-primary transition duration-200">About us </li>
      <li className=" hover:text-primary transition duration-200">Contact</li>
      <li className=" hover:text-primary transition duration-200">Pricing </li>
    </ul>

    <ul className="space-x-3  hidden md:flex  items-center">
        <a className="bg-slate-400 cursor-pointer  bg font-semibold group  bg-opacity-10 rounded-full w-max px-3 py-2 flex items-center space-x-2 ">Sign in  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 font-semibold group-hover:translate-x-1 transition duration-100 ">
            <path strokeLinecap="round"  strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          </a>
        <a className="bg-slate-400 cursor-pointer font-semibold  block px-2 py-2 rounded-full  bg-opacity-10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4  ">
            <path strokeLinecap="round"  strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
          </a>


       <CartButton/>
    </ul>


 </header>

  )
}
