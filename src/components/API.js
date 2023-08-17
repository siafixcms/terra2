export async function fetchData(query = '', filters = {}, page = 1) {
    const params = new URLSearchParams({
        q: query,
        ...filters,
        page,
        per_page: 30
    });
    const response = await fetch(`/api?${params.toString()}`);
    const data = await response.json();
    // return data && data.length ? data : [{id: 1, name: "test"},{id:2, name: "test2"}];
    return [
        {id: 1, name: "test"},
        {id: 2, name: "test2"},
        {id: 3, name: "test3"},
        {id: 4, name: "test4"},
        {id: 5, name: "test5"},
        {id: 6, name: "test6"},
        {id: 7, name: "test7"},
        {id: 8, name: "test8"},
        {id: 9, name: "test9"},
        {id: 10, name: "test10"},
        {id: 11, name: "test11"},
        {id: 12, name: "test12"},
        {id: 13, name: "test13"},
        {id: 14, name: "test14"},
        {id: 15, name: "test15"},
        {id: 16, name: "test16"},
        {id: 17, name: "test17"},
        {id: 18, name: "test18"},
        {id: 19, name: "test19"},
        {id: 20, name: "test20"},
        {id: 21, name: "test21"},
        {id: 22, name: "test22"},
        {id: 23, name: "test23"},
        {id: 24, name: "test24"},
        {id: 25, name: "test25"},
        {id: 26, name: "test26"},
        {id: 27, name: "test27"},
        {id: 28, name: "test28"},
        {id: 29, name: "test29"},
        {id: 30, name: "test30"},
        {id: 31, name: "test31"},
        {id: 32, name: "test32"},
        {id: 33, name: "test33"},
        {id: 34, name: "test34"},
        {id: 35, name: "test35"},
        {id: 36, name: "test36"},
        {id: 37, name: "test37"},
        {id: 38, name: "test38"},
        {id: 39, name: "test39"},
        {id: 40, name: "test40"},
        {id: 41, name: "test41"},
        {id: 42, name: "test42"}
    ];
}

export async function fetchTotalRecords() {
    const response = await fetch('/api/totalRecords');
    const { total } = await response.json();
    return total && total.length ? total : [];
}

export async function fetchDistinctValues(field) {
    const response = await fetch(`/api/distinctValues?field=${field}`);
    const data = await response.json();
    return data && data.length ? data : [];
}
