export async function fetchData(query = '', filters = {}, page = 1) {
    const payload = {
        q: query,
        ...filters,
        page
    };
    
    const response = await fetch('/api/users/get', {
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
        ...filters,
        page
    };
    
    const response = await fetch('/api/users/totalRecords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    let vreturn = data && data.length ? data : 0;

    return vreturn;
}

export async function fetchDistinctValues(field) {
    const response = await fetch(`/api/users/distinctValues?field=${field}`);
    const data = await response.json();
    return data && data.length ? data : [];
}
