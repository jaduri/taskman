import api from './api'


export function authenticate(token) {
    return api.post('/api/auth/refresh', {}, {
        headers: {
            refreshToken: token
        }
    });
}

export function login(credentials) {
    return api.post('/api/auth/login', credentials);
}

export function register(credentials) {
    return api.post('/api/auth/register', credentials);
}

export function logout() {
    return api.post();
}