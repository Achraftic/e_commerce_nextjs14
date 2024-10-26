import { Button } from '@/components/ui/button'
import H1 from '@/components/ui/h1'
import Image from 'next/image'
import React from 'react'

export default function AboutPage() {
    return (
        <section className=" relative">
            <H1 className='text-center my-12 text-5xl font-semibold'>About Us</H1>
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
                    <div
                        className="w-full justify-center items-start gap-6 grid grid-cols-2 lg:order-first order-last">
                        <div className="lg:justify-center sm:justify-end justify-start  h-full items-start gap-2.5 flex">
                            <Image width={200} height={200} className=" rounded-xl  w-full object-cover"
                                src="https://images.unsplash.com/photo-1521898284481-a5ec348cb555?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="about Us image" />
                        </div>
                        <Image width={200} height={200} className="sm:ml-0 ml-auto w-full rounded-xl h-full object-cover"
                            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="about Us image" />
                    </div>
                    <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                        <div className="w-full flex-col justify-center items-start gap-8 flex">
                            <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                                <h2
                                    className="text-gray-900 text-4xl font-semibold leading-normal lg:text-start text-center">
                                    Empowering Each Other to Succeed</h2>
                                <p className="text-zinc-500 text-base font-normal leading-relaxed lg:text-start text-center ">
                                    Every project we&apos;ve undertaken has been a collaborative effort, where every person
                                    involved has left their mark. Together, we&apos;ve not only constructed buildings but also
                                    built enduring connections that define our success story.</p>
                            </div>
                            <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h3 className="text-gray-900 text-4xl font-semibold leading-normal">33+</h3>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Years of Experience</h6>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h4 className="text-gray-900 text-4xl font-semibold leading-normal">125+</h4>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Successful Projects</h6>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h4 className="text-gray-900 text-4xl font-semibold leading-normal">52+</h4>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Happy Clients</h6>
                                </div>
                            </div>
                        </div>
                        <Button>
                        Read More
                        </Button>
                            
                        
                </div>
            </div>
        </div>
        </section >

    )
}
