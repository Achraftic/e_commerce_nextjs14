import { NextRequest } from "next/server"

import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
 

export const { auth: middleware } = NextAuth(authConfig)

// export default auth (async function middleware(req: NextRequest) {
//   // Your custom middleware logic goes here
// })