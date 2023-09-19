<script>
    import { writable } from "svelte/store";
    import { onMount, onDestroy } from "svelte"; // Correct import
    export let title = "";
    export let showPopup = writable(false);
  
    const closePopup = () => {
      showPopup.set(false);
    };
  
    const handleKeydown = (event) => {
      if( event.key === 'Escape' ) {
        closePopup();
      }
    };
  
    // Add the event listener when the component mounts
    onMount(() => {
      window.addEventListener('keydown', handleKeydown);
    });
  
    // Remove the event listener when the component is destroyed
    onDestroy(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
</script>
  
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
        <slot></slot>
      </div>
    </div>
  {/if}
  
<style>
    .form-header {
        border-bottom: 1px solid #ccc;
        font-weight: bold;
        font-size: 20px;
    }

    .form-header {
        flex-shrink: 1; /* Adjust this */
        margin-bottom: 15px;
    }

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
        background-color: #f1f1f1;
    }
</style>  