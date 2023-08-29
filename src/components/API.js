export async function fetchData(query = '', filters = {}, page = 1) {
    // const params = new URLSearchParams({
    //     q: query,
    //     ...filters,
    //     page,
    //     per_page: 30
    // });
    // const response = await fetch(`/api?${params.toString()}`);
    // const data = await response.json();
    // return data && data.length ? data : [{id: 1, name: "test"},{id:2, name: "test2"}];
    console.log('query', query);
    console.log('filters', filters);
    console.log('page', page);
    let pages = {
        1: [
            {id: 1, name: "test", category: 1},
            {id: 2, name: "test2", category: 1},
            {id: 3, name: "test3", category: 1},
            {id: 4, name: "test4", category: 1},
            {id: 5, name: "test5", category: 2},
            {id: 6, name: "test6", category: 2},
            {id: 7, name: "test7", category: 2},
            {id: 8, name: "test8", category: 1},
            {id: 9, name: "test9", category: 1},
            {id: 10, name: "test10", category: 1},
            {id: 11, name: "test11", category: 1},
            {id: 12, name: "test12", category: 1},
            {id: 13, name: "test13", category: 1},
            {id: 14, name: "test14", category: 1},
            {id: 15, name: "test15", category: 3},
            {id: 16, name: "test16", category: 4},
            {id: 17, name: "test17", category: 3},
            {id: 18, name: "test18", category: 1},
            {id: 19, name: "test19", category: 1},
            {id: 20, name: "test20", category: 1}
        ],
        2: [
            {id: 21, name: "test21", category: 1},
            {id: 22, name: "test22", category: 3},
            {id: 23, name: "test23", category: 3},
            {id: 24, name: "test24", category: 1},
            {id: 25, name: "test25", category: 1},
            {id: 26, name: "test26", category: 1},
            {id: 27, name: "test27", category: 1},
            {id: 28, name: "test28", category: 1},
            {id: 29, name: "test29", category: 1},
            {id: 30, name: "test30", category: 1},
            {id: 31, name: "test31", category: 1},
            {id: 32, name: "test32", category: 1},
            {id: 33, name: "test33", category: 1},
            {id: 34, name: "test34", category: 1},
            {id: 35, name: "test35", category: 1},
            {id: 36, name: "test36", category: 1},
            {id: 37, name: "test37", category: 1},
            {id: 38, name: "test38", category: 1},
            {id: 39, name: "test39", category: 1},
            {id: 40, name: "test40", category: 1}
        ],
        3: [
            {id: 41, name: "test41", category: 1},
            {id: 42, name: "test42", category: 1}
        ]
    };
    return pages[page];
}

export async function fetchTotalRecords() {
    // const response = await fetch('/api/totalRecords');
    // const { total } = await response.json();
    // return total && total.length ? total : [];
    return 42;
}

export async function fetchDistinctValues(field) {
    // const response = await fetch(`/api/distinctValues?field=${field}`);
    // const data = await response.json();
    // return data && data.length ? data : [];
    let data = {name: ['email', 'other'], category: [1,2,3,4]};
    return data[field];
}
