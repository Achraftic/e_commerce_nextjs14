"use client"
import React, { useState, useEffect } from 'react';
import H1 from './ui/h1';
import { Button } from './ui/button';
import Image from 'next/image';

export default function ProductMarketing() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Set the target date for the countdown (e.g., Black Friday promotion)
        const targetDate = new Date('October 30, 2024 23:59:59').getTime();

        // Update countdown every second
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const timeDifference = targetDate - now;

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Update state with the time left
            setTimeLeft({
                days: days >= 0 ? days : 0,
                hours: hours >= 0 ? hours : 0,
                minutes: minutes >= 0 ? minutes : 0,
                seconds: seconds >= 0 ? seconds : 0,
            });

            // Clear interval when countdown is over
            if (timeDifference < 0) {
                clearInterval(interval);
            }
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-zinc-900 min-h-[400px] md:flex-nowrap flex-wrap flex items-center p-10  max-w-5xl rounded-md mx-auto my-20 md:gap-0 gap-10">
            <div>
                <span className='text-primary '>Mannete</span>
                <H1 className="text-zinc-50 text-5xl">Enhance Your Play Controller</H1>
                <div className="text-2xl flex gap-4 my-5">
                        <div className='rounded-full bg-zinc-50 md:w-[70px] md:h-[70px] w-14 h-14  text-zinc-800 md:text-lg text-base font-bold flex flex-col items-center justify-center'>
                            {timeLeft.days}
                            <span className=' md:text-sm text-xs font-semibold' >Days</span>

                        </div>
                        <div className='rounded-full bg-zinc-50 md:w-[70px] md:h-[70px] w-14 h-14  text-zinc-800 md:text-lg text-base font-bold flex flex-col items-center justify-center'>
                            {timeLeft.hours}
                            <span className=' md:text-sm text-xs font-semibold' >Hours</span>

                        </div>
                        <div className='rounded-full bg-zinc-50 md:w-[70px] md:h-[70px] w-14 h-14  text-zinc-800 md:text-lg text-base font-bold flex flex-col items-center justify-center'>
                            {timeLeft.minutes}
                            <span className=' md:text-sm text-xs font-semibold' >Minutes</span>

                        </div>
                        <div className='rounded-full bg-zinc-50 md:w-[70px] md:h-[70px] w-14 h-14  text-zinc-800 md:text-lg text-base font-bold flex flex-col items-center justify-center'>
                            {timeLeft.seconds}
                            <span className=' md:text-sm text-xs font-semibold' >Seconds</span>

                        </div>

                    </div>
                <Button className='px-8 h-10'>Buy Now</Button>

                {/* Countdown display */}
             
                  
             
            </div>

            <div className="mx-auto my-4">
                <Image
                    width={400}
                    height={400}
                    src="https://utfs.io/f/RZLHIUVnSKDXYmGUVqwoDHbK7upzGyi9FS4tALqeONfrMYl3"
                    priority={false}
                    className="shrink block rotate-12"
                    alt="ps4"
                />
            </div>
        </div>
    );
}
