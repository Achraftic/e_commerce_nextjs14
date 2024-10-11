import React from 'react'

export default function layout({ children }: { children: React.ReactElement }) {
    return (
        <div className='grid place-items-center h-screen'>
            <div className='min-h-[400px] grid p-5  bg-neutral-100  w-[400px] rounded-lg shadow-xl shadow-zinc-100 '>
                {children}

            </div>
        </div>
    )
}
