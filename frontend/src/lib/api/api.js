import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Token store
export const token = writable(browser ? localStorage.getItem('token') : null);

// Coalition token store
export const coalitionToken = writable(browser ? localStorage.getItem('coalitionToken') : null);

// Authentication state store
export const isAuthenticated = writable(browser ? !!localStorage.getItem('token') : false);

// Brand and user details
export const isbrandExists = writable(browser ? !!localStorage.getItem('isbrandExists') : false);
export const isloyaltyPointIssue = writable(browser ? !!localStorage.getItem('isloyaltyPointIssue') : false);

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

// Update coalition token
coalitionToken.subscribe(value => {
    if (browser) {
        if (value) {
            localStorage.setItem('coalitionToken', value);
        } else {
            localStorage.removeItem('coalitionToken');
        }
    }
});

// Logout function
export function logout() {
    token.set(null);
    coalitionToken.set(null); // Clear coalition token on logout
    if (browser) {
        localStorage.removeItem('token');
        localStorage.removeItem('coalitionToken');
        localStorage.removeItem('isbrandExists');
        localStorage.removeItem('isloyaltyPointIssue');
        window.location.href = '/login';
    }
}

// Stores for coalition setup
export const setupError = writable(null);
export const setupSuccess = writable(null);