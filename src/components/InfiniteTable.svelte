<script>
  import { fetchData, fetchTotalRecords } from './API.js';
  import Accordion from './Accordion.svelte';

  let query = '';
  let filters = {};
  let data = [];
  let page = 1;
  let totalRecords;

  async function loadData() {
      const result = await fetchData(query, filters, page);
      data = [...data, ...result];
  }

  async function loadTotalRecords() {
      totalRecords = await fetchTotalRecords();
  }

  loadTotalRecords();
  loadData();

  function onScroll(event) {
      if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
          page++;
          loadData();
      }
  }
</script>

<div class="dataTables_wrapper">
  <input class="dataTables_filter" bind:value={query} on:input={loadData} placeholder="Search..." />

  <Accordion>
      <!-- Filters go here -->
  </Accordion>

  <table class="dataTables_table" on:scroll={onScroll}>
      <thead>
          <!-- Headers go here -->
      </thead>
      <tbody>
          {#each data as row}
              <tr>
                  <!-- Data goes here -->
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
</style>
