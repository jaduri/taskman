import api from './api'

export function getAll() {
    return api.get('/api/tasks');
}

export function getById(id) {
    return api.get('/api/tasks/'+id);
}

export function create(task) {
    return api.post('/api/tasks', task);
}

export function updateById(id, payload) {
    return api.patch('/api/tasks/'+id, payload);
}

export function deleteById(id) {
    return api.delete('/api/tasks/'+id);
}