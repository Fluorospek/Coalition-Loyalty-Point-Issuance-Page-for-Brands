import { writable } from 'svelte/store';

// Create a writable store to track the authentication state
export const isAuthenticated = writable(false);

// Function to check if the user is authenticated by looking for the token in localStorage
export function checkAuth() {
    const token = localStorage.getItem('authToken');
    isAuthenticated.set(!!token);
}

// Function to log out the user
export function logout() {
    localStorage.removeItem('authToken');
    isAuthenticated.set(false);
}