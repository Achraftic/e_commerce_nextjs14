/* eslint-disable no-unused-vars */
"use client";
import { UploadButton } from '@uploadthing/react';
import React from 'react'

export default function Hero() {
  return (
    <div className=' basis-full   rounded-2xl grid  grid-rows-[repeat(5,300px)] lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 p-3'>

      <div className='bg-blue-100 '>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton endpoint="imageUploader"
        onClientUploadComplete={() => {
          // Do something with the response
         
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
      </div>
      <div className='bg-red-200 lg:col-[1/3] lg:row-[1]     '></div>
      <div className='bg-blue-300 lg:col-[4] lg:row-[1/3]   '></div>
      <div className='bg-zinc-300    '></div>
      <div className='bg-yellow-300 lg:row-[2] lg:col-[2/4] md:col-[2/4] row-[2]    '></div>
      
    </div>
  )
}
