import api from './api'

export function getDetails() {
    return api.get('/api/users/me');
}

export function updateDetails(payload) {
    return api.patch('/api/users/me', payload);
}