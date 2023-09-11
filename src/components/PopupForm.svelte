<script>
  import { writable } from "svelte/store";

  // Prop to receive the context
  export let context;

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
  const handleSubmit = () => {
    // Save data in the passed context
    context.data = "Your data here"; // Replace this with actual form data
    showPopup.set(false);
  };

  // Function to close the popup
  const closePopup = () => {
    showPopup.set(false);
  };
</script>

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

<!-- Button to open the popup -->
<button class="button" on:click={() => showPopup.set(true)}>Open Popup</button>

<!-- Popup -->
{#if $showPopup}
  <div class="popup">
    <div class="popup-content">
      <!-- Close button -->
      <span class="close-button" on:click={closePopup}>X</span>

      <!-- Form -->
      <form on:submit|preventDefault={handleSubmit}>
        
        <input bind:value={data.name} type="text" placeholder="Client full name" required />
        <select bind:value={data.type} required>
          <option value="person">Person</option>
          <option value="company">Company</option>
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  </div>
{/if}
