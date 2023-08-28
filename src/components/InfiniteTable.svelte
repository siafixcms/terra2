<script>
  import { fetchData, fetchTotalRecords, fetchDistinctValues } from './API.js';
  import Accordion from './Accordion.svelte';
  import FilterItem from './FilterItem.svelte';

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
    try {
      loading = true;
      const result = await fetchData(query, activeFilters, page);
      if (result && result.length > 0) { // Check if result is not empty
        data = [...data, ...result];
        console.log("Data loaded:", data); // Debug log
      } else {
        console.log("No more data to load"); // Debug log
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      loading = false;
    }
  }

  async function loadDistinctValues() {
    try {
      for (let field of filters) {
        distinctValues[field] = await fetchDistinctValues(field);
      }
    } catch (error) {
      console.error("Error loading distinct values:", error);
    }
  }

  async function loadTotalRecords() {
    try {
      totalRecords = await fetchTotalRecords();
    } catch (error) {
      console.error("Error loading total records:", error);
    }
  }

  function resetData() {
    data = [];
    page = 1;
    loadTotalRecords().catch(error => console.error("Error in resetData - loadTotalRecords:", error));
    loadData().catch(error => console.error("Error in resetData - loadData:", error));
  }

  let timeout;
  function onSearchInput() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      resetData();
    }, 300);
  }

  function updateFilter(field, values) {
    activeFilters[field] = values;
    resetData();
  }

  function removeFilter(field) {
    delete activeFilters[field];
    resetData();
  }

  loadTotalRecords().catch(error => console.error("Error in initial loadTotalRecords:", error));
  loadData().catch(error => console.error("Error in initial loadData:", error));
  loadDistinctValues().catch(error => console.error("Error in initial loadDistinctValues:", error));

  function onScroll(event) {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight && !loading) {
      console.log("Scroll event triggered"); // Debug log
      page++;
      loadData().catch(error => console.error("Error in onScroll - loadData:", error));
    }
  }

  function handleFilterUpdate(event) {
    const { field, selectedOptions } = event.detail;
    updateFilter(field, selectedOptions);
  }

  function generateFilterComponents(filters, headers, distinctValues, activeFilters) {
    return filters.map(field => {
      return {
        component: FilterItem,
        props: {
          field,
          header: headers[field] || field,
          options: distinctValues[field] || [],
          selectValue: activeFilters[field] || []
        },
        on: {
          update: handleFilterUpdate
        }
      };
    });
  }

  $: filterComponents = generateFilterComponents(filters, headers, distinctValues, activeFilters);
  $: content = [
    {
      header: "Filters",
      body: filterComponents
    }
  ];

  let columnWidth;
  $: {
    const columnCount = visibleFields.length ? visibleFields.length : (data[0] ? Object.keys(data[0]).length : 1);
    columnWidth = 100 / columnCount + '%';
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

  <Accordion {content} />

  <div class="breadcrumbs">
    {#each Object.keys(activeFilters) as field}
      <span>
        {field}: {activeFilters[field].join(', ')}
        <button on:click={() => removeFilter(field)}>x</button>
      </span>
    {/each}
  </div>

  <div class="dataTables_table">
    <div class="dataTables_table_head">
      <table>
        <thead>
          <tr>
            {#each (visibleFields.length ? visibleFields : (data[0] ? Object.keys(data[0]) : [])) as key}
              <th style="width: {columnWidth};">{headers[key] || key}</th>
            {/each}
          </tr>
        </thead>
      </table>
    </div>
    <div class="dataTables_table_body" on:scroll={onScroll}>
      <table>
        <tbody>
          {#each data as row}
            <tr>
              {#each (visibleFields.length ? visibleFields : Object.keys(row)) as key}
                <td style="width: {columnWidth};">{row[key]}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
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