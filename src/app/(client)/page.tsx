import Image from 'next/image'
import React from 'react'
import img1 from "@/public/images_product/pngwing.com (1) (2).png"
// import img2 from "@/public/images_product/pngwing.com (3) (1).png"
import img3 from "@/public/images_product/pngwing.com.png"

export default function Homepage() {
  return (
    <div className="grid  grid-cols-2 row-span-2 mt-0  h-full     md:grid-rows-2   gap-5">

      <div className="bg-zinc-300 rounded-lg  gap-6 col-span-2   max-sm:flex-wrap relative bg-opacity-20 max-sm:p-10 p-3   flex sm:justify-evenly  max-sm:justify-start items-center">
        <div className="space-y-3 rounded-md ">
          <span className="text-primary">the best place to buy _</span>
          <h1 className="title text-5xl ">Ps4 Consoles</h1>
          <p className="text-sm w-80 text-gray opacity-85">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio animi corporis magnam dolor doloribu </p>
          <button className="btn-primary py-2 px-5 bg-primary text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring">Shop Now</button>
        </div>
        <Image width={200} height={300} src={img1} priority={false} className=" shrink    lg:w-[300px] lg:h-[300px]  bottom-0 -z-10 right-0  w-[240px] h-[240px]" alt="ps4" />

      </div>
      <div className="bg-primary col-span-1 z-0 gap-6  max-md:flex-wrap  top-0 rounded-md flex items-center  relative md:px-8 px-4 py-5 overflow-hidden ">
        <div className="space-y-3 z-20 ">
          <span className="text-zinc-50">the best place to buy _</span>
          <h1 className="title text-zinc-100 text-4xl max-sm:text-2xl  ">New Casque Gaming </h1>

          <button className=" py-2 px-5 p-6 text-nowrap bg-black  text-zinc-100 font-semibold rounded-lg shadow-md focus:outline-none focus:ring">Shop Now</button>
        </div>
        <Image width={160} height={200} src={img3}   priority={false} className="shrink block " alt="ps4" />

      </div>
      <div className="bg-neutral-300  col-span-1 z-0 gap-6  max-md:flex-wrap  top-0 rounded-md flex items-center  relative md:px-8 px-4 py-5 overflow-hidden  ">
        <div className="space-y-3 z-20 ">
          <span className="text-zinc-50">the best place to buy _</span>
          <h1 className="title text-zinc-100 text-4xl max-sm:text-2xl  ">New Casque Gaming </h1>

          <button className=" py-2 px-5 p-6 text-nowrap bg-black  text-zinc-100 font-semibold rounded-lg shadow-md focus:outline-none focus:ring">Shop Now</button>
        </div>
        <Image width={160} height={200} src={img3}   priority={false} className="shrink block " alt="ps4" />

      </div>
     


    </div>
  )
}

