import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Token store
export const token = writable(browser ? localStorage.getItem('token') : null);
// Authentication state store
export const isAuthenticated = writable(browser ? !!localStorage.getItem('token') : false);

//for brand and user details
export const isbrandExists = writable(browser ? !!localStorage.getItem('isbrandExists') : false);
export const isloyaltyPointIssue = writable(browser ? !!localStorage.getItem('isloyaltyPointIssue') : false);

// Authentication state store
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
// Update token and authentication state




// Logout function
export function logout() {
    token.set(null);
    if (browser) {
        localStorage.removeItem('token');
        localStorage.removeItem('isbrandExists')
        localStorage.removeItem('isloyaltyPointIssue')
        window.location.href = '/login';
    }
}
