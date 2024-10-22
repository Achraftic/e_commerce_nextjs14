'use client'
import React from 'react'
import { VscListSelection } from 'react-icons/vsc'
import NavPhone from './NavPhone'


export default function HumburgerMenu() {
    const [toggle, setToggle] = React.useState(false)
    return (
        <div>

            <VscListSelection size={25} className='md:hidden  cursor-pointer' onClick={() => setToggle(!toggle)} />
            
                <NavPhone toggle={toggle} setToggle={setToggle} />
        
        </div>
    )
}
