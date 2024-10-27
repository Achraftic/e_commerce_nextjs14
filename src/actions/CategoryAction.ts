"use server"

import { cache } from "react";
import prisma from "../../prisma/db";
import { revalidatePath } from "next/cache";
import exp from "constants";

export const getALLCategories = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
           id: "desc",
        }
    });
    return categories;
}

export const  getCategory = cache(async (id: number) => {
    const category = await prisma.category.findUnique({
        where:{
            id
        }
    });

    return category;
})

export const addCategory = async (formData: FormData) => {
    const name = formData.get("name") as string;
    if(!name){
        return  {message:"name is required"} ;
    }

    const category = await prisma.category.create({
        data:{
            name
        }
    });
    revalidatePath("/dashboard/categories");
    return category;
} 
export const editCategory = async (formData: FormData, id: number) => {
    const name = formData.get("name") as string;
    if(!name){
        return  {message:"name is required"} ;
    }
    const category = await prisma.category.update({
        where:{
            id
        },
        data:{
            name
        }
    });
    revalidatePath("/dashboard/categories");
    return category;
}
export const deleteCategory = async (id: number) => {
    const category = await prisma.category.delete({
        where:{
            id
        }
    });
    revalidatePath("/dashboard/categories");
    return category;
}