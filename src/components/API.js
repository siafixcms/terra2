export async function fetchData(query = '', filters = {}, page = 1) {
    const params = new URLSearchParams({
        q: query,
        ...filters,
        page,
        per_page: 30
    });

    const response = await fetch(`/api?${params.toString()}`);
    const data = await response.json();

    return data ? data : [];
}

export async function fetchTotalRecords() {
    const response = await fetch('/api/totalRecords');
    const { total } = await response.json();

    return total ? total : [];
}

export async function fetchDistinctValues(field) {
    const response = await fetch(`/api/distinctValues?field=${field}`);
    const data = await response.json();
    return data ? data : [];
}
