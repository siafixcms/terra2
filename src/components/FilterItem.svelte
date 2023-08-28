<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    export let field;
    export let header;
    export let options;
    export let selectValue;
  
    function handleChange(event) {
      const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
      dispatch('update', { field, selectedOptions });
    }
</script>

<div class="filter-item">
    <label for="{field}">{header}</label>
    <select id="{field}" multiple bind:value={selectValue} on:change={handleChange}>
        {#each options as option}
        <option value={option}>{option}</option>
        {/each}
    </select>
</div>

<style>
    .filter-item {
        flex-basis: calc(20% - 10px);
        max-width: 20%;
        margin-bottom: 20px;
        box-sizing: border-box;
    }

    .filter-item label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .filter-item select {
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>