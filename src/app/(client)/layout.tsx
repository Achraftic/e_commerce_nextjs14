
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

export default function layout({ children }: { children: React.ReactElement }) {
    return (
        <div className='min-h-screen text-sm '>
            <Header />
            <div className='sm:py-10 min-h-[calc(100vh-200px)] sm:px-10 grow lg:px-20 py-4 px-7  '>
                {children}
            </div>
            <Footer />
        </div>
    )
}
