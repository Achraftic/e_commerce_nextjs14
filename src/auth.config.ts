import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "../prisma/db";
import { LoginAuthSchema } from "./shema/shema";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  session: {
    maxAge: 60 * 60 * 24 * 30,
    strategy: "jwt",
  },

  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validateDataAuth = LoginAuthSchema.safeParse(credentials);
        if (!validateDataAuth.success) {
          return null;
        }
        const { email, password } = validateDataAuth.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.log("Email or password is incorrect");
          return null;
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword as string);
        if (!isMatch) {
          console.log("Email or password is incorrect");
          return null;
        }

        return {
          email: user.email,
          id: user.id,
          image: user?.image,
          role: user?.role,
          name: user?.name,
        };
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);
      const securePath = request.nextUrl.pathname;
      return isLoggedIn || !securePath.includes("/dashboard");
    },
    async redirect({ url, baseUrl, token }: { url: string; baseUrl: string; token?: { user?: { role?: string } } }) {
      const callbackUrl = new URL(url).searchParams.get("callbackUrl");
      const userRole = token?.user?.role;
      return userRole === "admin" ? callbackUrl || `${baseUrl}/dashboard` : callbackUrl || `${baseUrl}/`;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token = {
          ...token,
          userId: user.id,
          role: user.role,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
