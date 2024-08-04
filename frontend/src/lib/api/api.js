import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Auth token store
export const authToken = writable(browser ? localStorage.getItem('authToken') : null);
// Coalition token store
export const coalitionToken = writable(browser ? localStorage.getItem('coalitionToken') : null);

// Authentication state stores
export const isAuthenticated = writable(browser ? !!localStorage.getItem('authToken') : false);
export const isCoalitionAuthenticated = writable(browser ? !!localStorage.getItem('coalitionToken') : false);

// Update auth token and authentication state
authToken.subscribe(value => {
    if (browser) {
        if (value) {
            localStorage.setItem('authToken', value);
            isAuthenticated.set(true);
        } else {
            localStorage.removeItem('authToken');
            isAuthenticated.set(false);
        }
    }
});

// Update coalition token and authentication state
coalitionToken.subscribe(value => {
    if (browser) {
        if (value) {
            localStorage.setItem('coalitionToken', value);
            isCoalitionAuthenticated.set(true);
        } else {
            localStorage.removeItem('coalitionToken');
            isCoalitionAuthenticated.set(false);
        }
    }
});

// Logout function for auth token
export function logoutAuth() {
    authToken.set(null);
    if (browser) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }
}

// Logout function for coalition token
export function logoutCoalition() {
    coalitionToken.set(null);
    if (browser) {
        localStorage.removeItem('coalitionToken');
        window.location.href = '/coalition-login';
    }
}
