import { encryptData, decryptData, apiCall } from './APITools.js';

let baseUrl = '';

export function setBaseUrl(newBaseUrl) {
    baseUrl = newBaseUrl;
}

export async function fetchData(query = '', filters = {}, page = 1) {
    const payload = {
        q: query,
        filters: {
            ...filters
        },
        page
    };
    
    const response = await apiCall('/api/' + baseUrl + '/get', payload);
    
    const data = await response.json();

    return data && Array.isArray(data) ? data : [];
}

export async function fetchTotalRecords(query = '', filters = {}, page = 1) {
    const payload = {
        q: query,
        filters: {
            ...filters
        },
        page
    };
    
    const response = await apiCall('/api/' + baseUrl + '/totalRecords', payload);
    
    const data = await response.json();
    let vreturn = data ? data : 0;

    return vreturn;
}

export async function fetchDistinctValues(field) {
    const payload = {field};
    
    const response = await apiCall('/api/' + baseUrl + '/distinctValues', payload);
    
    const data = await response.json();

    return data && Array.isArray(data) ? data : [];
}

export async function create(payload) {
    
    const response = await apiCall('/api/' + baseUrl + '/create', {data: payload});
    
    const data = await response.json();

    return data && data.ok ? true : false;
}

export async function update(payload) {
    
    const response = await apiCall('/api/' + baseUrl + '/update', {data: payload});
    
    const data = await response.json();

    return data && data.ok ? true : false;
}

export async function softdelete(payload) {
    
    const response = await apiCall('/api/' + baseUrl + '/delete', {data: payload});
    
    const data = await response.json();

    return data && data.ok ? true : false;
}
