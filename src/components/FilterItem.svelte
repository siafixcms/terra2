<script>
    import { createEventDispatcher } from 'svelte';
    import { Dropdown } from '@flowbite/svelte';
    const dispatch = createEventDispatcher();
  
    export let field;
    export let header;
    export let options;
    export let selectValue = [];
  
    function handleSelect(option) {
      if (selectValue.includes(option)) {
        selectValue = selectValue.filter(item => item !== option);
      } else {
        selectValue = [...selectValue, option];
      }
      dispatch('update', { field, selectedOptions: selectValue });
    }
  </script>
  
  <div class="filter-item">
    <label for="{field}">{header}</label>
    <Dropdown let:toggle let:menu>
      <button use:toggle class="btn btn-outline-primary">
        {header}
        <i class="bi bi-caret-down-fill"></i>
      </button>
      <div use:menu class="dropdown-menu">
        {#each options as option}
          <a class="dropdown-item" on:click={() => handleSelect(option)}>
            <input type="checkbox" bind:checked={selectValue.includes(option)} />
            {option}
          </a>
        {/each}
      </div>
    </Dropdown>
  </div>
  
  <style>
    .filter-item {
      flex-basis: calc(20% - 10px);
      max-width: 20%;
      margin-bottom: 20px;
      box-sizing: border-box;
      align-self: flex-start;
    }
  
    .filter-item label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
  </style>
  