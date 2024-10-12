"use server"
import { signIn, signOut } from "@/auth.config";
import { LoginAuthSchema, SignUpAuthSchema } from "@/shema/shema";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../../prisma/db";
import bcrypt from "bcryptjs"


export async function logIn( formData: unknown) {

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