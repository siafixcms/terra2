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
    
    const data = await apiCall('/api/' + baseUrl + '/get', payload);
    let adata = Object.values(data);
    return adata && Array.isArray(adata) ? adata : [];
}

export async function fetchTotalRecords(query = '', filters = {}, page = 1) {
    const payload = {
        q: query,
        filters: {
            ...filters
        },
        page
    };
    
    const data = await apiCall('/api/' + baseUrl + '/totalRecords', payload);
    
    let vreturn = data ? parseInt(data.result) : 0;

    return vreturn;
}

export async function fetchDistinctValues(field) {
    const payload = {field};
    
    const data = await apiCall('/api/' + baseUrl + '/distinctValues', payload);
    let adata = Object.values(data);
    return adata && Array.isArray(adata) ? adata : [];
}

export async function create(payload) {
    
    const data = await apiCall('/api/' + baseUrl + '/create', {data: payload});
    
    return data && data.ok ? true : false;
}

export async function update(payload) {
    
    const data = await apiCall('/api/' + baseUrl + '/update', {data: payload});
    
    return data && data.ok ? true : false;
}

export async function softdelete(payload) {
    
    const data = await apiCall('/api/' + baseUrl + '/delete', payload);
    console.log('data', data);
    
    return data && data.ok ? true : false;
}
