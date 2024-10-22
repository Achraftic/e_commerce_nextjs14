'use client'
import { clientRoutes } from '@/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavLaptop({ activeClass, normalClass }:{activeClass:string,normalClass:string}) {
    const pathName=usePathname()
    return (
        <ul className=" space-x-5 hidden md:flex font-medium ">
            {clientRoutes.map((route, index) => (
                <Link key={index} href={route.path} className={`${pathName === route.path ? activeClass : normalClass}`} >{route.name} </Link>
            ))}
        </ul>
    )
}
