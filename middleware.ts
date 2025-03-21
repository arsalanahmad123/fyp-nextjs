import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export default async function middleware(req: NextRequest) {
    const session = await auth();

    if (!session) {
        const signinUrl = new URL('/signin', req.nextUrl.origin);
        return NextResponse.redirect(signinUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'], // Define protected routes
    runtime: 'experimental-edge',
};
