<script>
  import { writable } from "svelte/store";
  import { create, setBaseUrl } from './API.js';

  export let importbaseUrl;
  setBaseUrl(importbaseUrl);

  let data = {
    name: "",
    type: "person",
    jur_address: "",
    fact_address: "",
    email: "",
    reg_num: "",
    phone: "",
    web: ""
  };

  // Store to manage the popup visibility
  let showPopup = writable(false);

  // Function to handle form submission
  const handleSubmit = async () => {
    await create(data);
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

<button class="button" on:click={() => showPopup.set(true)}>Open Popup</button>

<!-- Popup -->
{#if $showPopup}
  <div class="popup">
    <div class="popup-content">
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
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
{/if}

<style>
  /* Button styles */
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
</style>