"use client";
import React from 'react';
import { Input } from './ui/input';
import { CiSearch } from 'react-icons/ci';

export default function SearchInput({ search, setSearch }: { search: string, setSearch:(value: string) => void }) {
   

    return (
        <div className="flex flex-wrap mb-5 justify-between items-center">
            <div className="relative w-full">
                <Input
                    defaultValue={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="h-9 w-full border border-zinc-300"
                />
                <CiSearch className="absolute right-2 text-zinc-800 top-2.5" size={18} />
            </div>
        </div>
    );
}
