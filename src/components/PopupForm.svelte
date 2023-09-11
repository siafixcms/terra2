<script>
  import { writable } from "svelte/store";
  import { create, setBaseUrl } from './API.js';
  import { reinitialize } from "./ReinitComponents.js";

  export let importbaseUrl;
  setBaseUrl(importbaseUrl);

  export let title = "";
  export let buttonName = "";

  let defaultData = {
    name: "",
    type: "person",
    jur_address: "",
    fact_address: "",
    email: "",
    reg_num: "",
    phone: "",
    web: ""
  };
  let data = defaultData;
  let uniqueId = importbaseUrl + '_table';

  // Store to manage the popup visibility
  let showPopup = writable(false);

  const resetData = () => {
    data = { ...defaultData };
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    await create(data);
    resetData();
    reinitialize.update(state => {
      state[uniqueId] = true;
      return state;
    });
    showPopup.set(false);
  };

  // Function to close the popup
  const closePopup = () => {
    showPopup.set(false);
  };

  // Function to handle keyboard events for the close button
  const handleKeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      closePopup();
    }
  };
</script>

<button class="button" on:click={() => showPopup.set(true)}>{buttonName}</button>

<!-- Popup -->
{#if $showPopup}
  <div class="popup">
    <div class="popup-content">
      <div class="form-header">
        <h2>{title}</h2>
      </div>
      <!-- Close button -->
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

      <!-- Form -->
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-content">
          <!-- Your form fields here -->
          <input bind:value={data.name} type="text" placeholder="Client full name" required />
          <select bind:value={data.type} required>
            <option value="person">Person</option>
            <option value="company">Company</option>
          </select>
          <br />
          <input bind:value={data.jur_address} type="text" placeholder="Official address" required />
          <input bind:value={data.fact_address} type="text" placeholder="Actual address" required />
          <br />
          <input bind:value={data.email} type="email" placeholder="E-mail address" required />
          <input bind:value={data.reg_num} type="text" placeholder="Registration number or personal code or social security number" required />
          <br />
          <input bind:value={data.phone} type="text" placeholder="Phone number" required />
          <input bind:value={data.web} type="text" placeholder="Web page" />
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
  input, select {
    margin: 10px;
  }

  .form-header {
    text-align: center;
    margin-bottom: 20px;
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
    background-color: white;
    padding: 20px;
    position: relative;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  /* Form content styles */
  .form-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* Form footer styles */
  .form-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding: 10px;
    border-top: 1px solid #ccc;
  }
</style>
