import axios from 'axios';

// Replace with your actual backend URL
const baseURL = 'http://localhost:3000';

// Login function
export async function login(email, password) {
    try {
        const response = await axios.post(`${baseURL}/auth/neucron-login`, { email, password });
        if (response.status === 200) {
            return response.data.neucron_token; // Extract token from response
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
}

// Fetch tokens function
export async function fetchTokens(neucronToken) {
    try {
        const response = await axios.get(`${baseURL}/loyalty/manage`, {
            headers: {
                'Authorization': `Bearer ${neucronToken}`,
            },
        });
        if (response.status === 200) {
            return response.data.tokens;
        } else {
            throw new Error('Failed to fetch tokens');
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch tokens');
    }
}