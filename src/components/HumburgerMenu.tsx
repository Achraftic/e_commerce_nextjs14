'use client'
import React from 'react'
import { VscListSelection } from 'react-icons/vsc'
import NavPhone from './NavPhone'
import { MdOutlineClose } from 'react-icons/md'


export default function HumburgerMenu() {
    const [toggle, setToggle] = React.useState(false)
    return (
        <div>
            {
                toggle
                    ? <MdOutlineClose size={25} className='md:hidden  cursor-pointer' onClick={() => setToggle(!toggle)} />
                    : <VscListSelection size={25} className='md:hidden  cursor-pointer' onClick={() => setToggle(!toggle)} />

            }




            <NavPhone toggle={toggle} setToggle={setToggle} />
        </div>
    )
}
