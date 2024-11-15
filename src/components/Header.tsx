import React from 'react'
import CartButton from './CartButton'
import ImageProfile from './ImageProfile';
import NavLaptop from './NavLaptop';
import HumburgerMenu from './HumburgerMenu';
import Logo from './Logo';
import { ModeToggle } from './ModeToggle';



export default function Header() {

  const activeClass = "font-medium text-primary"
  const normalClass = "hover:font-medium hover:text-primary transition-all"

  return (
    <header className="flex  justify-between sticky top-0 z-50  items-center py-5 px-10 text-sm  text-black dark:text-zinc-100">
      <div className='absolute inset-0 w-full h-full backdrop-blur-lg -z-20'></div>
      <Logo />
      <NavLaptop activeClass={activeClass} normalClass={normalClass} />
      <ul className="space-x-3 max-md:gap-2 items-center flex">
        <ImageProfile />
        <CartButton />
        <ModeToggle  />
        <HumburgerMenu />
      </ul>


    </header>

  )
}
