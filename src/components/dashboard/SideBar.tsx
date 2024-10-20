"use client";
import React, { useState } from "react";
import {  RiNextjsFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Link from "next/link";
import {  GoGraph, GoHome } from "react-icons/go";
import { BsBoxSeam } from "react-icons/bs";
import { PiShoppingCartSimple, PiShoppingCartSimpleLight } from "react-icons/pi";
import { IoChevronBackOutline } from "react-icons/io5";

const dashboardLinks = [
    { name: "Dashboard", icon: <GoHome />, path: "/dashboard" },
    { name: "Products", icon: <BsBoxSeam />, path: "/dashboard/products" },
    { name: "Orders", icon: <PiShoppingCartSimple />, path: "/dashboard/products" },
    { name: "Analytics", icon: <GoGraph />, path: "/dashboard/analytics" },
    
];

const activeClass = " bg-zinc-100 text-zinc-600  font-medium";
const normalClass = "text-zinc-500 transition hover:bg-zinc-100  hover:text-zinc-600 hover:font-medium";

export default function SideBar() {
    const [toggle, setToggle] = useState(false);

    return (
        <motion.div


            initial={{ width: 0 }}
            animate={{ width: "fit-content" }}
            transition={{ duration: 0.3 }}
            className="  sticky  h-screen py-6   top-0 flex flex-col justify-center bg-transparent p-2"
        >
            {/* Sidebar Header */}
            <IoChevronBackOutline size={15}  onClick={() => setToggle(!toggle)} className={`cursor-pointer absolute ${toggle &&"rotate-180"} max-md:hidden  top-3 text-zinc-500 right-0`} />
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
                {dashboardLinks.map((link, index) => (
                    <Link href={link.path} key={index}>
                        <span

                            className={`${link.path === "/dashboard" ? activeClass : normalClass} p-2 rounded-md md:text-sm text-xl flex max-md:justify-center m-auto items-center  space-x-2`}
                        >
                            <motion.span layout className={` text-lg m-auto`}>
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
