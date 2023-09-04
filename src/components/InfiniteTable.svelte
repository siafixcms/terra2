<script>
  import { fetchData, fetchTotalRecords, fetchDistinctValues } from './API.js';

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
      <div class="custom-dropdown">
        <button class="custom-dropdown-button">
          {headers[field] || field}
          <span class="custom-dropdown-icon">▼</span>
        </button>
        <div class="custom-dropdown-menu">
          {#each distinctValues[field] || [] as option}
            <div class="custom-dropdown-item">
              <input type="checkbox" id="{field}-{option}" checked={isChecked(field, option)} on:change={() => toggleChecked(field, option)} />
              <label for="{field}-{option}">{option}</label>
            </div>
          {/each}
        </div>
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

.custom-dropdown {
  position: relative;
  display: inline-block;
}

.custom-dropdown-button {
  background-color: #f1f1f1;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.custom-dropdown-icon {
  margin-left: 5px;
}

.custom-dropdown-menu {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.custom-dropdown-item {
  padding: 12px 16px;
  display: block;
}

.custom-dropdown:hover .custom-dropdown-menu {
  display: block;
}

</style>