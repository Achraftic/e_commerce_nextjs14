import NextAuth, { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"

import prisma from "../prisma/db";
import { LoginAuthSchema } from "./shema/shema";



export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin"
  },
  session: {
    maxAge: 60 * 60 * 24 * 30,
    strategy: "jwt",
  },

  providers: [
    Google
    ,
    Credentials({
      async authorize(credentials) {
        const validateDataAuth = LoginAuthSchema.safeParse(credentials)
        if (!validateDataAuth.success) {
          return null;
        }
        const { email, password } = validateDataAuth.data;
      
        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })
        console.log(user)
        if (!user) {
          console.log("email or password are incorect")
          return null
        }
        const ismatch = await bcrypt.compare(password, user?.hashedPassword as string)
        if (!ismatch) {
          console.log("Email or password are incorect")
          return null
        }

        return { email: user.email, id: user.id ,image:user?.image,role:user?.role,name:user?.name};
      }
    })

  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);
      const securepath = request.nextUrl.pathname
      if (!isLoggedIn && (securepath.includes("/dashboard"))) {
        return false;
      }
      return true
    },
    async redirect({ url, baseUrl, token }) {
      const callbackUrl = new URL(url).searchParams.get("callbackUrl");
      const userRole = token?.user?.role; // Ensure role is included in token
      if (userRole === "admin") {
        // Admin can access all URLs
        return callbackUrl || `${baseUrl}/dashboard`;
      } else {
        // Redirect non-admin users to a specific page
        return callbackUrl || `${baseUrl}/`; // Change this to your unauthorized page
      }


    },
    jwt: ({ token, user }) => {
     
      if (user) {

        token.userId = user.id
        token.role = user.role; // Add role to the token
      }
      return token
    },
    session: ({ session, token }) => {

      session.user.id = token.userId
      session.user.role = token.role; 
      return session
    }




  }
} satisfies NextAuthConfig

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig)