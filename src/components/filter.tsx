/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { SheetTitle } from './ui/sheet';
import { Slider } from './ui/slider';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';


export default function Filter({ categories, searchParams }: { categories: Category[], searchParams: { category?: string, price?: string } }) {
    const categorySearched = searchParams.category?.split(",").filter(Boolean)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(categorySearched || []);
    const [price, setPrice] = useState<number | null>(+searchParams.price || 0);
    const router = useRouter();
    


    // Handle category selection
    const handleFilterByCategory = (categoryName: string) => {
        const updatedCategories = selectedCategories.includes(categoryName)
            ? selectedCategories.filter((cat) => cat !== categoryName)
            : [...selectedCategories, categoryName];

        setSelectedCategories(updatedCategories);
    };

    const handlePriceChange = (newValue: number[]) => {
        setPrice(newValue[0]);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams();
        if (selectedCategories.length > 0) {
            queryParams.set("category", selectedCategories.join(","))
        }
        if (price) {
            queryParams.set("price", price.toString())
        }
        router.push(`/products?${queryParams.toString()}`);


    }, [price, selectedCategories])


    return (
        <form className="my-5 p-2 flex flex-col gap-6">
            <div>
                <SheetTitle className="mb-1.5">Category</SheetTitle>
                <div className="gap-2 grid">
                    {categories.map((category, index) => (
                        <div key={index} className="flex items-center gap-2 text-zinc-600 text-base">
                            <Input

                                type="checkbox"
                                checked={selectedCategories.includes(category.name)}
                                onChange={() => handleFilterByCategory(category.name)}
                                className="w-4 h-3"
                            />
                            <Label>{category.name}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <SheetTitle className="mb-1.5">Price</SheetTitle>
                <div>
                    <Slider
                        name="price"
                        defaultValue={[price === null ? 0 : price]}
                        max={100}
                        step={1}
                        onValueChange={handlePriceChange}
                    />
                    <p className='text-xs mt-2'>Selected Price: ${price===null?0:price}</p>
                </div>
            </div>
        </form>
    );
}
