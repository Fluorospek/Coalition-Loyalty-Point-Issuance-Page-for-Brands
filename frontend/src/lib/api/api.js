import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Token store
export const token = writable(browser ? localStorage.getItem('token') : null);

// Authentication state store
export const isAuthenticated = writable(browser ? !!localStorage.getItem('token') : false);

// Update token and authentication state
token.subscribe(value => {
    if (browser) {
        if (value) {
            localStorage.setItem('token', value);
            isAuthenticated.set(true);
        } else {
            localStorage.removeItem('token');
            isAuthenticated.set(false);
        }
    }
});

// Logout function
export function logout() {
    token.set(null);
    if (browser) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
}