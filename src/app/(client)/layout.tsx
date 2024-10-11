import Header from '@/components/Header'
import React from 'react'

export default function layout({ children }: { children: React.ReactElement }) {
    return (
        <>
            <Header />
            <div className='sm:py-10 sm:px-10 lg:px-20 py-4 px-4  '>
                {children}
            </div>
            this Footze
        </>
    )
}
