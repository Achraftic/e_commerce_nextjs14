"use client";
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { SheetTitle } from './ui/sheet';
import { Slider } from './ui/slider';
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import SearchInput from './SearchInput';
import { useDebounce } from '@/utils/utils';

export default function Filter({ categories, searchParams }: { categories: Category[], searchParams: { category?: string, price: string, s: string } }) {
    const categorySearched = searchParams.category?.split(",").filter(Boolean);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(categorySearched || []);
    const [search, setSearch] = useState(searchParams.s || "");
    const [price, setPrice] = useState<number>(+searchParams.price || 0);
    const router = useRouter();

    // Debounce the search input
    const debouncedSearch = useDebounce((value: string) => {
        setSearch(value);
    }, 500); // Adjust the delay as necessary

    // Handle category selection wit
    const handleFilterByCategory = (categoryName: string) => {
        setSelectedCategories(prevSelectedCategories => {
            const updatedCategories = prevSelectedCategories.includes(categoryName)
                ? prevSelectedCategories.filter((cat) => cat !== categoryName)
                : [...prevSelectedCategories, categoryName];

            return updatedCategories;
        });
     
    }

    // Handle price change wit
    const handlePriceChange = (newValue: number[]) => {
        setPrice(newValue[0]);
    }

    useEffect(() => {
        const queryParams = new URLSearchParams();

        if (selectedCategories.length > 0) {
            queryParams.set("category", selectedCategories.join(","));
        }

        if (price) {
            queryParams.set("price", price.toString());
        }

        if (search) {
            queryParams.set("s", search);
        }

        router.push(`/products?${queryParams.toString()}`);
    }, [price, selectedCategories, search, router]); // Include `search` in dependencies

    return (
        <form className="my-5 p-2 flex flex-col gap-6">
            <div>
                <SearchInput
                    search={search}
                    setSearch={debouncedSearch} // Use the debounced function here
                />
                <SheetTitle className="mb-1.5">Category</SheetTitle>
                <div className="gap-2 grid">
                    {categories.map((category, index) => (
                        <div key={index} className="flex items-center gap-2 text-zinc-600 text-base">
                            <Input
                                type="checkbox"
                                checked={selectedCategories.includes(category.name)}
                                onChange={() => handleFilterByCategory(category.name)}
                                className="w-4 h-3 cursor-pointer"
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
                        defaultValue={[price]}
                        max={100}
                        step={1}
                        onValueChange={handlePriceChange}
                    />
                    <p className='text-xs mt-2'>Selected Price: ${price}</p>
                </div>
            </div>
        </form>
    );
}
