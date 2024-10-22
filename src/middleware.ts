import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth.config";

export async function middleware(request: NextRequest) {
    const session = await auth(); // Retrieve the session with await

    
    if (!session?.user) {
        // If user is trying to access protected routes, redirect to sign-in
        if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/checkout')) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
        cl
        return NextResponse.next();
    }

    const isAdmin = session.user.role === 'admin'; // Determine if the user is an admin

    // Redirect logic for sign-in and sign-up pages
    if (request.nextUrl.pathname.startsWith('/signin') || request.nextUrl.pathname.startsWith('/signup')) {
        return isAdmin 
            ? NextResponse.redirect(new URL('/dashboard', request.url)) 
            : NextResponse.redirect(new URL('/', request.url));
    }

    // Allow access to the checkout route for all authenticated users
    if (request.nextUrl.pathname.startsWith('/checkout')) {
        return NextResponse.next();
    }

    // Restrict non-admin users from accessing the dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard') && !isAdmin) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect non-admins to home
    }

    // Allow access to all other routes
    return NextResponse.next();
}

export const config = {
    matcher: ['/checkout/:path*', '/dashboard/:path*', '/signin', '/signup'], // Define the routes this middleware applies to
};
