<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import socket from '../lib/webSocketConnection.js';
  import { updateACL } from './API.js';
  import { apiCall, setNotificationComponent } from './APITools.js';
  
  // State variables
  let username = "";
  let password = "";
  let system = "terra_balance";
  export const token = writable(null);
  export let notificationComponent;
  setNotificationComponent(notificationComponent);
  const acl = writable([]);
  let isProcessing = false;
  let errorMessage = "";

  // Load authentication status on startup
  onMount(async () => {

    socket.on('alert', (message) => {
      alert(message);
    });

    let initialToken = localStorage.getItem('auth_token');
    if( initialToken ) {
      token.set(initialToken);
    }

  });

  async function sendMessage(message) {
    socket.emit('message', message);
  }

  async function logout() {
    isProcessing = true;
    try {
      const response = await apiCall("/auth", { system, action: "logout", token });
      if (!response.ok) throw new Error('Could not complete logout');
      token.set(null);
      localStorage.removeItem('auth_token');
      sendMessage('Logged out!');
      errorMessage = '';
    } catch (error) {
      console.error(error);
      errorMessage = 'Could not complete login';
    } finally {
      isProcessing = false;
    }
  }

  async function login() {
    isProcessing = true;
    try {
      const response = await apiCall("/auth", { username, password, system, action: "login" });
      if (!response.ok) throw new Error('Could not complete login');
      const data = response;
      token.set(data.token);
      localStorage.setItem('auth_token', data.token);
      acl.set(await updateACL(data.token));
      sendMessage('Logged in!');
      errorMessage = '';
    } catch (error) {
      console.error(error);
      errorMessage = 'Could not complete login';
    } finally {
      isProcessing = false;
    }
  }

  async function refresh() {
    isProcessing = true;
    try {
      const response = await apiCall("/auth", { token, system, action: "refresh" });
      if (!response.ok) throw new Error('Could not complete refresh');
      const data = response;
      token.set(data.token);
      acl.set(await updateACL(data.token));
      errorMessage = '';
    } catch (error) {
      console.error(error);
      errorMessage = 'Could not complete refresh';
    } finally {
      isProcessing = false;
    }
  }

</script>

{#if !$token}
<div class="form-container h-screen bg-gray-200 w-full flex justify-center items-center">
  <form on:submit|preventDefault={login} class="w-80 h-80">
    <h2 class="left">Terra balance</h2>
    <input bind:value={username} placeholder="Username" required />
    <input bind:value={password} placeholder="Password" type="password" required />
    <button type="submit" disabled={isProcessing}>{isProcessing ? 'Loading...' : 'Login'}</button>
    <p>{errorMessage}</p>
  </form>
</div>
{:else}
  <button id="logout" on:click|preventDefault={logout} disabled={isProcessing}>{isProcessing ? 'Processing...' : 'Logout'}</button>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Vithkuqi:wght@400;700&display=swap');
  h2 {
    text-align: center;
    text-transform: uppercase;
    font-family: 'Noto Serif Vithkuqi', serif;
  }
  .form-container {
    font-family: 'Noto Serif Vithkuqi', serif;
    display: grid;
    place-items: center;
    height: 100vh;
  }
  form {
    width: 440px;
    border-radius: 10px;
    overflow: hidden;
    padding: 37px 45px 37px;
    border: 2px solid gray;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
    background-color: #fff;
    margin: auto;
  }
  form input {
    width: 350px;
    padding: 5px;
    margin: 20px auto;
    border: 0;
    border-bottom: 1px solid gray;
  }
  form button {
    width: 350px;
    background: #fff;
    padding: 5px;
    border: 1px dotted gray;
    box-sizing: content-box;
    border-radius: 10px;
    margin-top: 20px;
  }
  #logout {
    border-radius: 20px;
    border: 0;
    padding: 5px;
    background-color: inherit;
    color: #fff;
    font-weight: bold;
    line-height: 38px;
  }
  #logout:hover {
    background-color: #e0e0e0;
    color: #000;
  }
</style>