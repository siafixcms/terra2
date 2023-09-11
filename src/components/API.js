import { encryptData, decryptData } from './encodingUtils.js';

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
    
    const response = await fetch('/api/' + baseUrl + '/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
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
    
    const response = await fetch('/api/' + baseUrl + '/totalRecords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    let vreturn = data ? data : 0;

    return vreturn;
}

export async function fetchDistinctValues(field) {
    const payload = {field};
    
    const response = await fetch('/api/' + baseUrl + '/distinctValues', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
    const data = await response.json();

    return data && Array.isArray(data) ? data : [];
}

export async function create(payload) {
    
    const response = await fetch('/api/' + baseUrl + '/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: payload})
    });
    
    const data = await response.json();

    return data && data.ok ? true : false;
}

export async function update(payload) {
    
    const response = await fetch('/api/' + baseUrl + '/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: payload})
    });
    
    const data = await response.json();

    return data && data.ok ? true : false;
}

export async function softdelete(payload) {
    
    const response = await fetch('/api/' + baseUrl + '/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: payload})
    });
    
    const data = await response.json();

    return data && data.ok ? true : false;
}
