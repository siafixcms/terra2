<script>
  import { writable } from "svelte/store";
  import formStore from "../stores/formStore.js";
  import { onMount } from "svelte";
  import ClientsAdd from './FormLayouts/ClientsAdd.svelte';
  formStore.set({
    layout: ClientsAdd.default,
    handleSubmit: ClientsAdd.handleSubmit || null,
    defaultData: ClientsAdd.defaultData || {}
  });

  export let importbaseUrl;

  export let action;
  export let title = "";
  export let buttonName = "";

  let data = {};
  let uniqueId = importbaseUrl + '_table';


  let showPopup = writable(false);

  let dynamicForm;
  formStore.subscribe(value => {
    dynamicForm = value;
    if (dynamicForm.defaultData) {
      data = { ...dynamicForm.defaultData };
    }
  });

  const resetData = () => {
    if (dynamicForm.defaultData) {
      data = { ...dynamicForm.defaultData };
    }
  };

  const handleSubmit = async () => {
    if (dynamicForm && dynamicForm.handleSubmit) {
      await dynamicForm.handleSubmit(data);
    }
    resetData();
    showPopup.set(false);
  };

  const closePopup = () => {
    showPopup.set(false);
  };

  const handleKeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      closePopup();
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  onMount(async () => {
    let importPath = `./FormLayouts/${capitalizeFirstLetter(importbaseUrl.toLowerCase())}${action ? capitalizeFirstLetter(action.toLowerCase()) : ''}.svelte`;
    
    await import(importPath)
      .then(module => {
        formStore.set({
          layout: module.default,
          handleSubmit: module.handleSubmit || null,
          defaultData: module.defaultData || {}
        });
      })
      .catch(err => {
        console.error("Import failed:", err);
      });
  });
</script>

<button class="button" on:click={() => showPopup.set(true)}>{buttonName}</button>

{#if $showPopup}
  <div class="popup">
    <div class="popup-content">
      <div class="form-header">
        <h2>{title}</h2>
      </div>
      <span 
        class="close-button" 
        on:click={closePopup} 
        on:keydown={handleKeydown} 
        tabindex="0" 
        role="button" 
        aria-label="Close popup"
      >
        X
      </span>

      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-content-wrapper">
          <div class="form-content">
              <svelte:component this={dynamicForm.layout} bind:data={data} importbaseUrl={importbaseUrl} action={action} />
          </div>
        </div>
        <div class="form-footer">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  /* Button styles */
  .form-content-wrapper {
    max-height: calc(100vh - 200px); /* Adjust based on your header and footer height */
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

  /* Popup styles */
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .popup-content {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    position: relative;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 80%; /* Adjust this */
    width: auto; /* Adjust this */
    max-height: auto; /* Adjust this */
  }

  .form-header {
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    font-size: 20px;
  }

  .form-header, .form-footer {
    flex-shrink: 1; /* Adjust this */
    margin-bottom: 15px;
  }

  .form-content {
    flex-grow: 1;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    width: 36px; /* Set width */
    height: 36px; /* Set height */
    line-height: 36px; /* Center the "X" */
    text-align: center; /* Center the "X" horizontally */
    border-radius: 50%; /* Make it circular */
    background-color: transparent; /* Default to transparent */
    transition: background-color 0.3s ease; /* Smooth transition */
    border: 1px solid #ccc;
  }

  .close-button:hover {
    background-color: #f1f1f1; /* Background color on hover */
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
