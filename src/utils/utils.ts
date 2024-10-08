import { ProductCart } from "@/actions/action";

export function handleMergeArray(array1: ProductCart[], array2: ProductCart[]) {
    // Combine both arrays into one
    const combinedArray = [...array1, ...array2];

    // Use reduce to merge items with the same id
    const mergedArray = combinedArray.reduce((acc, item) => {
        // Find if the product already exists in the accumulator
        const existingProduct = acc.find(i => i.id === item.id);

        if (existingProduct) {
            // If found, add the quantity
            existingProduct.quantity += item.quantity;
        } else {
            // If not found, push the new product
            acc.push({ ...item });
        }

        return acc;
    }, [] as ProductCart[]); // Specify the type for the accumulator

    return mergedArray;
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
