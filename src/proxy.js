import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const privateRoutes = ['/private', '/dashboard', '/secret'];
const adminOnlyRoutes = ['/dashboard/manage-decorators', '/dashboard/assign-task', '/dashboard/worker-dashboard'];
const workerOnlyRoutes = ['/dashboard/my-tasks', '/dashboard/earnings'];
const userOnlyRoutes = ['/dashboard/becomeworker'];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
    const token = await getToken({ req });
    const reqPath = req.nextUrl.pathname;
    const isAuthenticated = Boolean(token);
    const isUser = token?.role === 'user';
    const isAdmin = token?.role === 'admin';
    const isWorker = token?.role === 'worker';
    const isPrivate = privateRoutes.some(route => reqPath.startsWith(route));

    if (isPrivate && !isAuthenticated) {
        const loginUrl = new URL('/api/auth/signin', req.url);
        loginUrl.searchParams.set('callbackUrl', reqPath);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthenticated) {
        if (isUser && (adminOnlyRoutes.some(route => reqPath.startsWith(route)) || workerOnlyRoutes.some(route => reqPath.startsWith(route)))) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (isWorker && (adminOnlyRoutes.some(route => reqPath.startsWith(route)) || userOnlyRoutes.some(route => reqPath.startsWith(route)))) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (isAdmin && (workerOnlyRoutes.some(route => reqPath.startsWith(route)) || userOnlyRoutes.some(route => reqPath.startsWith(route)))) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
    }

    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
    matcher: [
        '/private/:path*',
        '/dashboard/:path*',
        '/secret/:path*'
    ],
}