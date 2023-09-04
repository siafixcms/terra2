export async function fetchData(query = '', filters = {}, page = 1) {
    const params = new URLSearchParams({
        q: query,
        ...filters,
        page,
        per_page: 30
    });
    const response = await fetch(`/api/users/get?${params.toString()}`);
    const data = await response.json();
    return data && data.length ? data : [];
}

export async function fetchTotalRecords(query = '', filters = {}, page = 1) {
    const params = new URLSearchParams({
        q: query,
        ...filters,
        page,
        per_page: 30
    });
    const response = await fetch(`/api/users/totalRecords?${params.toString()}`);
    const data = await response.json();
    let vreturn = data && data.length ? data : [];
    return vreturn;
}

export async function fetchDistinctValues(field) {
    const response = await fetch(`/api/users/distinctValues?field=${field}`);
    const data = await response.json();
    return data && data.length ? data : [];
}
