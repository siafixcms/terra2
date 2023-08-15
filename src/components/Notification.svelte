<script>
    import { fade } from 'svelte/transition';
    import { tick } from 'svelte';
  
    export let message = "";
    let showNotification = false;
  
    export function displayNotification(customMessage) {
      if (customMessage) {
        message = customMessage;
      }
      showNotification = true;
      tick().then(() => {
        setTimeout(() => {
          showNotification = false;
        }, 3000); // Notification will disappear after 3 seconds
      });
    }
  </script>
  
  <!-- The actual notification -->
  {#if showNotification}
    <div class="notification" transition:fade>
      {message}
    </div>
  {/if}
  
  <style>
    .notification {
      position: fixed;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      background-color: #44c767;
      color: white;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
  </style>
  