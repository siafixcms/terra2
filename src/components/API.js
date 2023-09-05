export let baseUrl = '';

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
