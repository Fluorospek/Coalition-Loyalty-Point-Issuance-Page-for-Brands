import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, fetch }) => {
    const token = cookies.get('access_token');

    if (!token) {
        throw redirect(302, '/login');
    }

    // Verify the token with the backend
    try {
        const res = await fetch('http://localhost:3000/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (res.ok) {
            const data = await res.json();
            return { userData: data.user };
        } else {
            throw redirect(302, '/login');
        }
    } catch (error) {
        throw redirect(302, '/login');
    }
};