
import { CartItemsType } from "@/types/type";

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
