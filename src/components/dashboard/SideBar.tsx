"use client";
import React, { useEffect, useState } from "react";
import { RiNextjsFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { dashboardRoutes } from "@/routes";

const activeClass = " bg-zinc-100 text-zinc-600 font-medium";
const normalClass = "text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-600 hover:font-medium";

export default function SideBar() {
    const [toggle, setToggle] = useState(false);
    const currentPath = usePathname();
    const [width, setWidth] = useState(0); // Initialize width as 0

    useEffect(() => {
        // Check if window is defined before accessing its properties
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth); // Set the initial width on client side

            const handleResize = () => {
                setWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);

            // Cleanup the event listener on component unmount
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    const sidebarWidth = () => {
        if (width < 768 || toggle) {
            return "60px";
        } else {
            return "220px";
        }
    };

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: sidebarWidth() }}
            transition={{ duration: 0.2 }}
            className="sticky h-screen py-6 md:w-full w-max top-0 flex flex-col justify-center bg-transparent px-2 "
        >
            {/* Sidebar Header */}
            <div  
            className={`cursor-pointer absolute ${toggle && "rotate-180"} rounded-full p-0.5 bg-zinc-100  shadow max-md:hidden top-3 text-zinc-400 -right-2`} 
            onClick={() => setToggle(!toggle)} 
            >

            <IoChevronBackOutline 
                size={13} 
              
               
            />
            </div>
            <h1 className="flex mt-2 items-center gap-2 text-lg font-semibold md:w-full w-min mx-auto">
                <motion.span layout>
                    <RiNextjsFill size={40} />
                </motion.span>
                {!toggle && (
                    <motion.span
                        layout
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="md:flex hidden"
                    >
                        NextProject
                    </motion.span>
                )}
            </h1>

            {/* Main Links */}
            <ul className="flex flex-col my-8 md:gap-4 gap-6 w-full flex-grow">
                {dashboardRoutes.map((link, index) => (
                    <Link href={link.path} key={index}>
                        <span
                            className={`${link.path === currentPath ? activeClass : normalClass} p-2 rounded-md md:text-sm text-xl flex max-md:justify-center m-auto items-center space-x-2`}
                        >
                            <motion.span className="text-lg m-auto">
                                {link.icon}
                            </motion.span>
                            {!toggle && (
                                <motion.span
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="md:inline hidden w-40"
                                >
                                    {link.name}
                                </motion.span>
                            )}
                        </span>
                    </Link>
                ))}
            </ul>
        </motion.div>
    );
}
