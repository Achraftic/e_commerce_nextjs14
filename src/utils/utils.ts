
import { CartItemsType } from "@/types/type";
import React from "react";


export function handleMergeArray(array1: CartItemsType[], array2: CartItemsType[]): CartItemsType[] {
    // Create a map to hold merged cart items
    const mergedMap = new Map<number, CartItemsType>();

    // Helper function to add items to the map
    const addItemsToMap = (array: CartItemsType[]) => {
        for (const item of array) {
            const productId = item.product.id;
            console.log(`Processing item: ${JSON.stringify(item)}`);

            if (mergedMap.has(productId)) {
                // If the product already exists, add the quantity
                const existingItem = mergedMap.get(productId)!; // Non-null assertion since we checked for existence
                existingItem.quantity += item.quantity;
                console.log(`Merged item with id ${productId}: new quantity ${existingItem.quantity}`);
            } else {
                // If not found, add the new product
                mergedMap.set(productId, { ...item });
                console.log(`Added new item with id ${productId}: quantity ${item.quantity}`);
            }
        }
    };

    // Add both arrays to the map
    addItemsToMap(array1);
    addItemsToMap(array2);

    // Convert the map values back to an array
    const mergedArray = Array.from(mergedMap.values());
    console.log(`Merged array: ${JSON.stringify(mergedArray)}`);

    return mergedArray;
}


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const debouncedCallback = React.useCallback((...args: Parameters<T>) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    // Cleanup function
    React.useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return debouncedCallback;
}


// utils/exportToExcel.js
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


export const exportToExcel = async (data:any[], fileName = 'data.xlsx') => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');
  
  // Set worksheet columns
  worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));
  data.forEach(row => worksheet.addRow(row));

  // Generate the Excel file as a Blob
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Use FileSaver to save the file
  saveAs(blob, fileName);
};
