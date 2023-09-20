<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import formStore from "../stores/formStore.js";
  import componentRegistry from './ComponentRegistry.js';
  import handleSubmitStore from '../stores/handleSubmitStore';
  import Popup from './Popup.svelte';
  import { editFormData } from '../stores/editFormDataStore.js';

  export let importbaseUrl;
  export let action;
  export let title = "";
  export let buttonName = "";
  export let buttonVisible = true;

  let data = {};
  let formElement;
  let showPopup = writable(false);
  let dynamicForm;

  formStore.subscribe(value => {
    dynamicForm = value;
    if (dynamicForm.defaultData) {
      data = { ...dynamicForm.defaultData };
    }
  });

  let handleSubmitFunction;

  handleSubmitStore.subscribe(value => {
    handleSubmitFunction = value;
  });

  const resetData = () => {
    if (dynamicForm.defaultData) {
      data = { ...dynamicForm.defaultData };
    }
  };

  const handleSubmit = async () => {
    if (handleSubmitFunction) {
      await handleSubmitFunction(data, action);
    }
    resetData();
    showPopup.set(false);
  };

  const handleKeydown = async (event) => {
    if (event.key === 'Enter') {
      await handleSubmit();
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  let Component; // Declare a variable to hold the dynamically selected component

  onMount(() => {
    const componentName = `${capitalizeFirstLetter(importbaseUrl.toLowerCase())}${action ? capitalizeFirstLetter(action.toLowerCase()) : ''}`;
    Component = componentRegistry[componentName];

    if (Component) {
      formStore.set({
        layout: Component,
        handleSubmit: Component.handleSubmit || null,
        defaultData: Component.defaultData || {}
      });
    } else {
      console.error("Component not found in registry:", componentName);
    }
  });

  $: if ($showPopup && formElement) {
    const firstInput = formElement.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }

  // editFormData.subscribe(value => {
  //   data = { ...value };
  // });
</script>

<Popup {title} {showPopup}>
  <form bind:this={formElement} on:submit|preventDefault={handleSubmit}>
    <div class="form-content-wrapper">
      <div class="form-content">
          <svelte:component this={dynamicForm.layout} bind:data={data} importbaseUrl={importbaseUrl} action={action} />
      </div>
    </div>
    <div class="form-footer">
      <button type="submit" on:keydown={handleKeydown}>Save</button>
    </div>
  </form>
</Popup>

{#if $buttonVisible}
  <button class="button" on:click={() => showPopup.set(true)}>{buttonName}</button>
{/if}

<style>

  .form-footer {
    flex-shrink: 1;
    margin-bottom: 15px;
  }

  .form-content-wrapper {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }

  button[type="submit"] {
    padding: 10px;
    border: 1px solid black;
    border-radius: 18px;
  }

  .button {
    padding: 10px 20px;
    background-color: blue;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .form-content {
    flex-grow: 1;
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding: 10px;
    border-top: 1px solid #ccc;
    margin-bottom: 0;
    padding-bottom: 0;
  }
</style>
