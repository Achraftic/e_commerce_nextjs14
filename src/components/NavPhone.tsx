'use client'
import { clientRoutes } from '@/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Logo from './Logo'
import { motion, AnimatePresence } from 'framer-motion'
import { IoChevronForward } from 'react-icons/io5'

interface NavPhoneProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
}

export default function NavPhone({ setToggle, toggle }: NavPhoneProps) {
  const pathName = usePathname();
  const activeClass = "font-medium text-primary";
  const normalClass = "hover:font-medium hover:text-primary transition-all";

  return (
    
    
    <AnimatePresence>
    
      {toggle && (
        <motion.div
          key="nav-phone"
          initial={{ width: 0 }}
          animate={{ width: "250px" }}
          exit={{ width: 0, transition: { duration: 0.05 } }}
          transition={{ duration: 0.3 }}
          className="p-4 fixed left-0 h-screen shadow-xl top-0 bg-zinc-50 dark:bg-zinc-800 md:hidden z-50 overflow-hidden"
        >
          <motion.div
            layout
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}

            transition={{ delay: 0.3 }}
          >
            <Logo />
          </motion.div>
          <motion.ul className="text-lg my-8 gap-4 flex flex-col font-medium">
            {clientRoutes.map((route, index) => (
              <Link
                onClick={() => setToggle(false)}
                key={index}
                href={route.path}
                className={`${pathName === route.path ? activeClass : normalClass}`}
              >
                <motion.span
                  layout
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}

                  transition={{ delay: 0.3 }}
                >
                  {route.name}
                </motion.span>
              </Link>
            ))}
          </motion.ul>
          <Link href="/signin" className=" cursor-pointer gap-1     font-semibold  flex items-center  ">Sign in
           <IoChevronForward  />
          </Link>
        </motion.div>
      )}
  
    </AnimatePresence>
  );
}
