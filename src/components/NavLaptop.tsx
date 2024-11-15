'use client'
import { clientRoutes } from '@/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { motion } from "framer-motion"

export default function NavLaptop({ activeClass, normalClass }: { activeClass: string, normalClass: string }) {
    const pathName = usePathname()
    return (
        <ul className=" space-x-5 hidden md:flex z-50 font-medium ">
            {clientRoutes.map((route, index) => (
                <div key={index} className='relative'>

                    <Link href={route.path} className={`${pathName === route.path ? activeClass : normalClass}`} >{route.name} </Link>
                    {pathName === route.path && <motion.div layoutId="ligne_relative" transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="h-1 bg-primary rounded-2xl absolute w-2/3 -bottom-1"></motion.div>}
                </div>
            ))}
        </ul>
    )
}
