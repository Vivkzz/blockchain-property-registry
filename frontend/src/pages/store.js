import { writable } from 'svelte/store';
import { jwtDecode } from "jwt-decode";

export const properties = writable([]);
export const user = writable({
    isLoggedIn: false,
    token: null,
    email: '',
    name: '',
    bids: []
});

export async function fetchProperties() {
    const response = await fetch('http://localhost:3000/property');
    const data = await response.json();
    properties.set(data);
}

export function login(email, password) {
    return fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('jwt', data.access_token);
                const decoded = jwt_decode(data.access_token);
                user.set({
                    isLoggedIn: true,
                    token: data.access_token,
                    email: decoded.email,
                    name: decoded.name,
                    bids: decoded.bids
                });
            }
        });
}

export function register(email, password) {
    return fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
}

export function getUserId() {
    const token = localStorage.getItem('jwt');
    if (token) {
        const decoded = jwt_decode(token);
        return decoded.sub; // assuming 'sub' is the user ID in the token payload
    }
    return null;
}

export async function fetchUserProfile(userId) {
    const response = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
    if (response.ok) {
        return response.json();
    }
    throw new Error('Failed to fetch user profile');
}
