"use client"
import React, { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import usePaginationStore from "@/store/usePaginationStore";
import { SearchParmFilterType } from "@/types/type";

type PaginationCompProps = {
    totalItems: number; // Total number of items, e.g., total products
    itemsPerPage: number; // Number of items per page
    numpage: number
    searchParams: SearchParmFilterType
};

export function PaginationComp({ totalItems, itemsPerPage, numpage, searchParams }: PaginationCompProps) {
    const { currentPage, setCurrentPage } = usePaginationStore();

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
  

    const isactive = (page: number) => {
        if (page == 1 && numpage === undefined) {
            return true

        }
        if (page == numpage) {
            return true;
        }
        return false
    }
    const buildQueryParams = (page: number) => {
        const queryParams = new URLSearchParams({ page: String(page) });
        if (searchParams.category) queryParams.set("category", searchParams.category);
        if (searchParams.price) queryParams.set("price", searchParams.price);
        if (searchParams.s) queryParams.set("s", searchParams.s);
        return queryParams.toString();
    };

    const renderPageLinks = () => {
        const pages = [];
        for (let i = 1; i <= totalItems; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href={`/products?${buildQueryParams(i)}`}
                        isActive={isactive(i)}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return pages;
    };

    return (
        <Pagination className="mt-20">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={`/products?page=${numpage - 1}`}
                        onClick={() => setCurrentPage(Math.max(1, numpage - 1))}

                    />
                </PaginationItem>

                {/* Render page numbers */}
                {renderPageLinks()}

                {/* Ellipsis to indicate more pages */}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        href={`/products?page=${currentPage + 1}`}
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}

                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
