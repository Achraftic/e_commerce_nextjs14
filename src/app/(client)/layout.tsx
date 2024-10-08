import Header from '@/components/Header'
import React from 'react'

export default function layout({ children }: { children: React.ReactElement }) {
    return (
        <>
            <Header />
            <div className='py-10 px-20  '>
                {children}
            </div>
            this Footze
        </>
    )
}
