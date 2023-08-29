<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { Button, Dropdown, DropdownItem, Checkbox } from 'flowbite-svelte';
  import { Icon } from 'flowbite-svelte-icons';
  const dispatch = createEventDispatcher();
  
  export let field;
  export let header;
  export let options = [];
  export let selectValue = [];

  if (!selectValue) {
    selectValue = [];
  }

  function handleSelect(option) {
    if (options && selectValue) {
      if (selectValue.includes(option)) {
        selectValue = selectValue.filter(item => item !== option);
      } else {
        selectValue = [...selectValue, option];
      }
      dispatch('update', { field, selectedOptions: selectValue });
    }
  }
  
  function isChecked(option) {
    return selectValue.includes(option);
  }

  onMount(async () => {
    
  });
</script>

<div>
<Button>{header}<Icon name="chevron-down-solid" class="w-3 h-3 ml-2" /></Button>
<Dropdown let:toggle let:menu>
  <div use:menu class="w-44 p-3 space-y-3 text-sm">
    {#each options as option}
      <li>
        <Checkbox checked={isChecked(option)} on:change={() => handleSelect(option)}>
          {option}
        </Checkbox>
      </li>
    {/each}
  </div>
</Dropdown>
</div>