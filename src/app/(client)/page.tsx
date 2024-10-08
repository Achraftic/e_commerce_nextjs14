import Image from 'next/image'
import React from 'react'
import img1 from "@/public/images_product/pngwing.com (1) (2).png"
// import img2 from "@/public/images_product/pngwing.com (3) (1).png"
import img3 from "@/public/images_product/pngwing.com.png"

export default function Homepage() {
  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-2 grid-row-3 mt-0  h-full    md:grid-rows-2   gap-5">

      <div className="bg-zinc-300 !rounded-lg  gap-6  basis-full max-sm:flex-wrap relative bg-opacity-20 lg:col-span-4 max-sm:p-10 p-3   md:col-span-2 lg:row-span-2 flex sm:justify-evenly  max-sm:justify-start items-center">
        <div className="space-y-3 rounded-md ">
          <span className="text-primary">the best place to buy _</span>
          <h1 className="title text-5xl ">Ps4 Consoles</h1>
          <p className="text-sm w-80 text-gray opacity-85">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio animi corporis magnam dolor doloribu </p>
          <button className="btn-primary py-2 px-5 bg-primary text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring">Shop Now</button>
        </div>
        <Image width={200} height={300} src={img1} priority={false} className=" shrink    lg:w-[300px] lg:h-[300px]  bottom-0 -z-10 right-0  w-[240px] h-[240px]" alt="ps4" />

      </div>
      <div className="bg-primary lg:col-span-2 z-0 sm:justify-evenly gap-6  max-sm:flex-wrap  top-0 rounded-md flex items-center col-span-1 relative md:p-4 p-10 ">
        <div className="space-y-3 z-20 ">
          <span className="text-[#F0EDCF]">the best place to buy _</span>
          <h1 className="title text-white md:text-2xl text-4xl max-w-full ">New Casque Gaming </h1>

          <button className=" py-2 px-5 p-6 bg-black  text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring">Shop Now</button>
        </div>
        <Image width={160} height={200} src={img3}   priority={false} className="shrink block " alt="ps4" />

      </div>
      <div className=" bg-neutral-200 lg:col-span-2 z-0 sm:justify-evenly gap-6  max-sm:flex-wrap  top-0 rounded-md flex items-center col-span-1 relative md:p-4 p-10 ">
        <div className="space-y-3 z-20 ">
          <span className="text-zinc-500">the best place to buy _</span>
          <h1 className="title text-dark md:text-2xl text-4xl max-w-full ">New Casque Gaming </h1>

          <button className=" py-2 px-5 p-6 bg-black  text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring">Shop Now</button>
        </div>
        <Image width={160} height={200} src={img3}   priority={false} className="shrink block " alt="ps4" />

      </div>


    </div>
  )
}

