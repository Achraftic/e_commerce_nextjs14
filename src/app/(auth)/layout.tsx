import React from 'react'

export default function layout({ children }: { children: React.ReactElement }) {
    return (
        <div className='grid place-items-center h-screen'>
            <div className='min-h-[400px] grid p-5  bg-zinc-100/50  w-[400px] rounded-lg shadow-xl shadow-zinc-100  '>
                {children}

            </div>
        </div>
    )
}
