
import React from 'react'
import CartButton from './CartButton'
import { VscListSelection } from "react-icons/vsc";
import ImageProfile from './ImageProfile';
import NavLaptop from './NavLaptop';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import HumburgerMenu from './HumburgerMenu';
import Logo from './Logo';



export default function Header() {

  const activeClass = "font-medium text-primary"
  const normalClass = "hover:font-medium hover:text-primary transition-all"

  return (
    <header className="flex justify-between items-center py-5 px-10 text-sm  text-black">
      <Logo />
      <NavLaptop activeClass={activeClass} normalClass={normalClass} />

      <ul className="space-x-3 max-md:gap-2 items-center flex">

        <ImageProfile />
        <CartButton />
        <HumburgerMenu />
      </ul>


    </header>

  )
}
