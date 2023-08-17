<script>
  import { fetchData, fetchTotalRecords, fetchDistinctValues } from './API.js';
  import Accordion from './Accordion.svelte';

  export let headers = {};
  export let visibleFields = [];
  export let filters = [];

  let query = '';
  let activeFilters = {};
  let data = [];
  let page = 1;
  let totalRecords;
  let distinctValues = {};

  async function loadData() {
      const result = await fetchData(query, activeFilters, page);
      data = [...data, ...result];
  }

  async function loadDistinctValues() {
      for (let field of filters) {
          distinctValues[field] = await fetchDistinctValues(field);
      }
  }

  async function loadTotalRecords() {
      totalRecords = await fetchTotalRecords();
  }

  loadTotalRecords();
  loadData();
  loadDistinctValues();

  function onScroll(event) {
      if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
          page++;
          loadData();
      }
  }

  function updateFilter(field, values) {
      activeFilters[field] = values;
      loadData();
  }

  function removeFilter(field) {
      delete activeFilters[field];
      loadData();
  }
</script>

<div class="dataTables_wrapper">
  <input class="dataTables_filter" bind:value={query} on:input={loadData} placeholder="Search..." />

  <Accordion>
    {#each filters as field}
      <div>
        <label>{headers[field] || field}</label>
        <select multiple bind:value={activeFilters[field]} on:change={() => updateFilter(field, activeFilters[field])}>
          {#each distinctValues[field] || [] as value}
            <option value={value}>{value}</option>
          {/each}
        </select>
      </div>
    {/each}
  </Accordion>

  <div class="breadcrumbs">
    {#each Object.keys(activeFilters) as field}
      <span>
        {field}: {activeFilters[field].join(', ')}
        <button on:click={() => removeFilter(field)}>x</button>
      </span>
    {/each}
  </div>

  <table class="dataTables_table" on:scroll={onScroll}>
      <thead>
          <tr>
              {#each (visibleFields.length ? visibleFields : Object.keys(data[0] || {})) as key}
                  <th>{headers[key] || key}</th>
              {/each}
          </tr>
      </thead>
      <tbody>
          {#each data as row}
              <tr>
                  {#each (visibleFields.length ? visibleFields : Object.keys(row)) as key}
                      <td>{row[key]}</td>
                  {/each}
              </tr>
          {/each}
      </tbody>
  </table>

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

  .dataTables_table {
      width: 100%;
      border-collapse: collapse;
      overflow: auto;
      max-height: 400px;
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
</style>
