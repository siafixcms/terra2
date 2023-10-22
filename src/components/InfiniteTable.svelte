<script>
  import Popup from './Popup.svelte';
  import { writable } from "svelte/store";
  import { editFormData, showPopup} from '../stores/editFormDataStore.js';
  let confirmPopup = writable(false);
  let confirmMassDeletePopup = writable(false);
  import { fetchData, fetchTotalRecords, fetchDistinctValues, softdelete, massDelete, setBaseUrl } from './API.js';
  import { reinitialize } from "./ReinitComponents.js";
  import PopupForm from './PopupForm.svelte';
  let localEditFormData = writable({});
  let selectedRow;
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let headers = {};
  export let visibleFields = [];
  export let filters = [];
  export let importbaseUrl;
  export let buttonName = "";
  export let buttonVisible = true;

  setBaseUrl(importbaseUrl);

  let query = '';
  let activeFilters = {};
  let data = [];
  let page = 1;
  let totalRecords;
  let distinctValues = {};
  let loading = false;
  let timeout;
  let action;

  let uniqueId = importbaseUrl + '_table';

  $: if ($reinitialize[uniqueId]) {
    resetData();
    reinitialize.update(state => {
      state[uniqueId] = false;
      return state;
    });
  }

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
      if (data.length < totalRecords) {
        page++;
        loadData();
      }
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

  async function editRow(row) {
    editFormData.set(row);
    action = "edit";
    showPopup.set(true);
  }

  async function deleteRow(row) {
    await softdelete(row.id);
    resetData();
  }

  function confirmDelete(row) {
    console.info("getting called???")
    selectedRow = row; // Set the selected row
    confirmPopup.set(true); // Show the popup
  }

  let selectedRows = [];

  function selectAllRows() {
    selectedRows = data.map((row) => row.id);
  }

  function deselectAllRows() {
    selectedRows = [];
  }

  function toggleRowSelection(rowId) {
    if (selectedRows.includes(rowId)) {
      selectedRows = selectedRows.filter((id) => id !== rowId);
    } else {
      selectedRows = [...selectedRows, rowId];
    }
    console.log(selectedRows)
    dispatch('checkSelector', {
        data_id: selectedRows
    });
  }

  async function performMassDelete() {
    if (selectedRows.length === 0) {
      return; // Do nothing if no rows are selected
    }

    const deletables = selectedRows;
    await massDelete(deletables);

    selectedRows = []; // Clear selected rows after deletion
    resetData();
    $confirmMassDeletePopup = false; // Close the confirm popup
  }


</script>

{#if buttonVisible}
  <div class="flex justify-end mb-4">
    <button class="button_blue" on:click|stopPropagation={() =>{showPopup.set(true); editFormData.set({}); action='create'}}>Add {buttonName}</button>
    <button class="button_red" on:click={() => {$confirmMassDeletePopup = true;}} disabled={selectedRows.length === 0}>Delete {buttonName}s ({selectedRows.length})</button>
  </div>
{/if}

{#if $showPopup}
  <PopupForm importbaseUrl={importbaseUrl} {action} buttonVisible={false}/>
{/if}

{#if $confirmPopup}
  <Popup title="Are you sure?" bind:showPopup={$confirmPopup}>
    <button on:click={() => {
      deleteRow(selectedRow);
      confirmPopup.set(false);
    }}>Yes</button>
    <button on:click={() => {
      confirmPopup.set(false);
    }}>No</button>
  </Popup>
{/if}
{#if $confirmMassDeletePopup}
  <Popup title="Confirm Mass Delete" bind:showPopup={$confirmMassDeletePopup}>
    <button on:click={performMassDelete}>Yes</button>
    <button on:click={() => $confirmMassDeletePopup = false}>No</button>
  </Popup>
{/if}

<div class="dataTables_wrapper">
  <div class="search-and-filters">
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
  </div>

  <div class="loadingView">
    {#if loading}
      <span>Loading...</span>
    {/if}
  </div>

  <div class="dataTables_table">
    <div class="scrollable-div" on:scroll={onScroll}>
      <table>
        <thead>
          <tr>
            <th style="width: 30px;">
              <input
                type="checkbox"
                id="selectAll"
                checked={selectedRows.length === data.length}
                on:change={() => {
                  selectedRows.length === data.length
                    ? deselectAllRows()
                    : selectAllRows();
                }}
              />
            </th>
            {#each visibleFields.length ? visibleFields : Object.keys(data[0] || {}) as field}
              <th style="width: {100 / visibleFields.length}%;">{headers[field] || field}</th>
            {/each}
            <th style="width: 100px; white-space: nowrap;">Actions</th>
          </tr>
        </thead>
        <tbody class="scrollable-tbody" on:scroll={onScroll}>
          {#each data as row}
            <tr>
              <td style="width: 30px;">
                <input
                  type="checkbox"
                  id="{row.id}"
                  checked={selectedRows.includes(row.id)}
                  on:change={() => toggleRowSelection(row.id)}
                />
              </td>
              {#each visibleFields.length ? visibleFields : Object.keys(row) as field}
                <td style="width: {100 / visibleFields.length}%;">{row[field]}</td>
              {/each}
              <td style="width: 100px; white-space: nowrap;">
                <button class="action-button" on:click|preventDefault={() => editRow(row)}>Edit</button> |
                <button class="action-button" on:click|preventDefault={() => confirmDelete(row)}>Delete</button>
              </td>              
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="dataTables_info">
    Total records: {totalRecords}
    Selected: {selectedRows.length}
  </div>
</div>

<style>
  .action-button {
    background: none;
    color: blue;
    border: none;
    padding: 0;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
    margin-right: 10px;
  }

  .action-button:last-child {
    margin-right: 0;
  }

  .loadingView {
    position: absolute;
    top: 65px;
    left: 12px;
    background-color: #fff;
    padding: 10px;
  }

  .filters {
    width: 50%;
    margin-bottom: 10px;
    padding-left: 15px;
  }
  .dataTables_wrapper {
    font-family: Arial, sans-serif;
    position: relative;
    padding: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
  }

  .dataTables_filter {
      width: 50%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
  }

  .dataTables_table table tbody {
    height: 400px;
    border: 1px solid #ccc;
  }

  .dataTables_table table {
    width: 100%;
    table-layout: fixed;
  }

  .dataTables_table {
    width: 100%;
    border-collapse: collapse;
  }

  .dataTables_table thead {
      background-color: #f5f5f5;
  }

  .dataTables_table thead th {
    background-color: #f5f5f5;
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    text-transform: capitalize;
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
    z-index: 2;
  }

  .custom-dropdown-item {
    padding: 12px 16px;
    display: block;
  }

  .custom-dropdown:hover .custom-dropdown-menu {
    display: block;
  }

  .scrollable-div {
    height: 400px;
    overflow-y: auto;
    position: relative;
  }

  .dataTables_table thead {
    display: table;
    width: calc(100%);
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .dataTables_table tbody {
    display: table;
    width: calc(100%);
  }

  .search-and-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dataTables_filter {
    margin-right: auto;
  }

  .filters {
    margin-left: auto;
    display: flex;
    gap: 10px;
  }

  .button_blue {
    padding: 10px 20px;
    background-color: blue;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .button_red {
    padding: 10px 20px;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
</style>