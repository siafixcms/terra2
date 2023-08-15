<script>
    import { fade } from 'svelte/transition';
    import { tick } from 'svelte';
  
    export let message = "";
    let showNotification = false;
  
    let notifications = [];

    function displayNotification(message) {
        notifications = [...notifications, message];
        setTimeout(() => {
        notifications = notifications.filter(notif => notif !== message);
        }, 5000); // Remove the notification after 5 seconds
    }
  </script>
  
  <!-- The actual notification -->
  {#each notifications as notification (notification)}
    <div class="notification">
        {notification}
    </div>
  {/each}
  
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
  