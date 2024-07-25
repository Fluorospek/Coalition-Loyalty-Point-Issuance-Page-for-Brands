import { isAuthenticated } from './lib/stores/user';

export const handle = async ({ event, resolve }) => {
    const token = event.cookies.get('access_token');

    // Set the authentication state based on the token
    if (token) {
        isAuthenticated.set(true);
    } else {
        isAuthenticated.set(false);
    }

    // Example of protected routes
    const protectedRoutes = ['/dashboard',];

    if (protectedRoutes.includes(event.url.pathname) && !token) {
        return Response.redirect(new URL('/login', event.url));
    }

    return resolve(event);
};