import { NextResponse } from 'next/server';

export function middleware(request) {
    let verified = request.cookies.get('loggedIn');

    if(!verified) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/',
        '/admin/:path*',
    ]
}
