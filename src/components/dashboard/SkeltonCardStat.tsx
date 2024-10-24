import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function SkeltonCardStat() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full  grid-cols-1 gap-4 *:rounded-lg mt-6">
    {Array.from({ length: 4 }).map((_, index) => (
        <div className="flex flex-col space-y-3 my-3 m-auto w-full" key={index}>
            <Skeleton className="h-[96px] w-full rounded-xl" />
          
        </div>
    ))}
</div>
  )
}
