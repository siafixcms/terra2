<script>
  import { fetchData, fetchTotalRecords, fetchDistinctValues } from './API.js';
  import { Button, Dropdown, Checkbox } from 'flowbite-svelte';
  import { Icon } from 'flowbite-svelte-icons';

  export let headers = {};
  export let visibleFields = [];
  export let filters = [];

  let query = '';
  let activeFilters = {};
  let data = [];
  let page = 1;
  let totalRecords;
  let distinctValues = {};
  let loading = false;

  async function loadData() {
    loading = true;
    const result = await fetchData(query, activeFilters, page);
    data = result ? [...data, ...result] : data;
    loading = false;
  }

  async function loadDistinctValues() {
    for (let field of filters) {
      distinctValues[field] = await fetchDistinctValues(field);
    }
  }

  async function loadTotalRecords() {
    totalRecords = await fetchTotalRecords();
  }

  function resetData() {
    data = [];
    page = 1;
    loadTotalRecords();
    loadData();
  }

  function onSearchInput() {
    clearTimeout(timeout);
    timeout = setTimeout(resetData, 300);
  }

  function updateFilter(field, values) {
    activeFilters[field] = values;
    resetData();
  }

  function removeFilter(field) {
    delete activeFilters[field];
    resetData();
  }

  loadTotalRecords();
  loadData();
  loadDistinctValues();

  function onScroll(event) {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight && !loading) {
      page++;
      loadData();
    }
  }

  function handleSelect(field, option) {
    const values = activeFilters[field] || [];
    if (values.includes(option)) {
      values.splice(values.indexOf(option), 1);
    } else {
      values.push(option);
    }
    updateFilter(field, values);
  }

  function isChecked(field, option) {
    return activeFilters[field]?.includes(option);
  }

  function toggleChecked(field, option) {
    const checked = isChecked(field, option);
    handleSelect(field, option, !checked);
  }
</script>

<div class="dataTables_wrapper">
  <div class="dataTables_info">
    {#if loading}
      <span>Loading...</span>
    {/if}
    Total records: {totalRecords}
  </div>

  <input class="dataTables_filter" bind:value={query} on:input={onSearchInput} placeholder="Search..." />

  <div class="filters">
    {#each filters as field}
      <div>
        <Button>{headers[field] || field}<Icon name="chevron-down-solid" class="w-3 h-3 ml-2" /></Button>
        <Dropdown let:toggle let:menu>
          <div use:menu class="w-44 p-3 space-y-3 text-sm">
            {#each distinctValues[field] || [] as option}
              <li>
                <Checkbox checked={isChecked(field, option)} on:change={() => toggleChecked(field, option)}>
                  {option}
                </Checkbox>
              </li>
            {/each}
          </div>
        </Dropdown>
      </div>
    {/each}
  </div>

  <div class="dataTables_table">
    <table>
      <thead>
        <tr>
          {#each visibleFields as field}
            <th>{headers[field] || field}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data as row}
          <tr>
            {#each visibleFields as field}
              <td>{row[field]}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="dataTables_info">
    Total records: {totalRecords}
  </div>
</div>

<style>
  .dataTables_wrapper {
      font-family: Arial, sans-serif;
      position: relative;
      padding: 20px;
      border: 1px solid #ddd;
      background-color: #fff;
  }

  .dataTables_filter {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
  }

  .dataTables_table table tbody {
    border: 1px solid #ccc;
  }
  .dataTables_table {
    width: 100%;
    border-collapse: collapse;
  }

  .dataTables_table_head {
    width: calc(100%); /* Adjust based on your scrollbar width */
  }

  .dataTables_table thead {
      background-color: #f5f5f5;
  }

  .dataTables_table thead th {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
  }

  .dataTables_table tbody tr:hover {
      background-color: #f5f5f5;
  }

  .dataTables_table tbody td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
  }

  .dataTables_info {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 0.9em;
      color: #666;
  }

  .breadcrumbs {
      margin: 10px 0;
      font-size: 0.9em;
  }

  .breadcrumbs span {
      margin-right: 10px;
      background-color: #f5f5f5;
      padding: 5px;
      border-radius: 4px;
  }

  .breadcrumbs button {
      margin-left: 5px;
      background-color: red;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
  }

  .dataTables_table {
    position: relative;
  }

  .dataTables_table_head {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #f5f5f5;
  }

  .dataTables_table_body {
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    display: block;
  }

.dataTables_table {
  width: 100%;
  border-collapse: collapse;
}

.dataTables_table_head,
.dataTables_table tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.dataTables_table thead {
  display: table-header-group;
}

.dataTables_table tbody {
  display: table-row-group;
}

.dataTables_table {
    display: block;
    width: 100%;
  }

  .dataTables_table_head,
  .dataTables_table_body {
    display: block;
  }

  .dataTables_table_head {
    overflow: hidden;
  }

  .dataTables_table_head table,
  .dataTables_table_body table {
    width: 100%;
    table-layout: fixed;
  }

</style>