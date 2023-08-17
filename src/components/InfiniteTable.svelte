<script>
  import { fetchData, fetchTotalRecords } from './API.js';
  import Accordion from './Accordion.svelte';

  export let headers = {}; // Object for custom headers
  export let visibleFields = []; // Array of fields to display

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
  /* ... (same styles as before) ... */
</style>
