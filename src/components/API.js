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
    const data = await apiCall('/api/' + baseUrl + '/delete', {data: payload});
    return data && data.ok ? true : false;
}

export async function massDelete(payload) {
    const data = await apiCall('/api/' + baseUrl + '/massdelete', {data: payload});
    return data && data.ok ? true : false;
}

export async function rolesList() {
    let data = await apiCall('/api/permissions/rolesList');
    if( data && data.ok ) {
        delete data.ok;
        data = Object.values(data);
    } else {
        data = false;
    }
    return data;
}

export async function userRoles(payload) {
    let data = await apiCall('/api/permissions/userRoles', {data: payload});
    if( data && data.ok ) {
        delete data.ok;
        data = Object.values(data);
    } else {
        data = false;
    }
    return data;
}

export async function userPermissions(payload) {
    let data = await apiCall('/api/permissions/userPermissions', {data: payload});
    if( data && data.ok ) {
        delete data.ok;
        data = Object.values(data);
    } else {
        data = false;
    }
    return data;
}

export async function updateACL(authToken) {
    try {
        const response = await apiCall("/acl", { token: authToken });
        if (!response.ok) throw new Error('Could not fetch ACL');
        const data = response;
        return data.acl;
    } catch (error) {
        console.error(error);
    }
}