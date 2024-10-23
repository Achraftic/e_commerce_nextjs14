"use server"
import { signIn, signOut } from "@/auth.config";
import { LoginAuthSchema, SignUpAuthSchema } from "@/shema/shema";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../../prisma/db";
import bcrypt from "bcryptjs"
import { UTApi } from "uploadthing/server";
import { revalidatePath } from "next/cache";




export async function logIn(formData: unknown) {

    if (!(formData instanceof FormData)) {
        return { message: "invalide form data" }
    }
    const authData = Object.fromEntries(formData.entries());
    const validateDataAuth = LoginAuthSchema.safeParse(authData)

    if (!validateDataAuth.success) {
        return { message: "invalide form" }
    }
    try {

        await signIn("credentials", authData);

    }
    catch (error) {
        if (error instanceof AuthError) {

            if (error.type === "CredentialsSignin") {
                return { message: 'Email or password are invalid' }
            }
            else {
                return { message: 'somthing go wrong please try again' }
            }
        }
        else {
            throw error
        }

    }


}

export async function SignUp(formData: unknown) {

    if (!(formData instanceof FormData)) {
        return { message: "invalide form data" }
    }

    const authData = Object.fromEntries(formData.entries());

    const validateDataAuth = SignUpAuthSchema.safeParse(authData)

    if (!validateDataAuth.success) {
        return { message: "invalide form" }
    }
    const userExist = await prisma.user.findUnique({
        where: {
            email: authData.email as string
        }
    })
    if (userExist) {
        return { message: "user already exist" }
    }
    try {
        const hachpassword = bcrypt.hashSync(authData.password as string, 10)
        await prisma.user.create({
            data: {
                name: authData.name as string,
                email: authData.email as string,
                hashedPassword: hachpassword as string,
                image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
        })
        redirect("/signin")
    }
    catch (error) {
        throw error
    }

}

export async function LoginWithGoogle() {
    await signIn("google")
}
export async function Logout() {
    await signOut()
    redirect("/login")
}



export async function updateProfile(formData: FormData) {
    const userData = Object.fromEntries(formData.entries());
    const utapi = new UTApi();
    const imageFile = userData.image as File;

    const user = await prisma.user.findUnique({
        where: {
            id: userData.id as string,
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            hashedPassword: true
        }
    });

    let updateData;
    if (user?.hashedPassword === null) {
        updateData = {
            name: userData.name as string,
            image: user?.image as string,
        };
    } else {
        updateData = {
            name: userData.name as string,
            image: user?.image as string,
            email: user?.email as string,
        };
    }

    if (imageFile instanceof File && imageFile.size > 0) {
        const response = await utapi.uploadFiles([imageFile]);
        updateData.image = response[0].data?.url as string;

        if (user?.image) {
            const newUrl = user.image.substring(user.image.lastIndexOf("/") + 1);
            const result = await utapi.deleteFiles([newUrl]);
            console.log("Old image deleted:", result);
        }
    }

    const result = await prisma.user.update({
        where: {
            id: userData.id as string,
        },
        data: updateData,
    });

    revalidatePath("/");

    return result;
}
