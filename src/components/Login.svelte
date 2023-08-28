<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import socket from '../../lib/webSocketConnection.js';
  
  // State variables
  let username = "";
  let password = "";
  let system = "terra_balance";
  let secret = "terra_balance_seterra_balance_se";
  export const token = writable(null);
  export let notificationComponent;
  const acl = writable([]);
  let isProcessing = false;
  let errorMessage = "";

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

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

  async function notify(msg) {
    notificationComponent.displayNotification(msg);
  }

  async function encryptData(data) {
    const encodedData = encoder.encode(data);
    const key = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "AES-CBC", length: 256 },
        false,
        ["encrypt"]
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const encryptedContent = await window.crypto.subtle.encrypt(
        { name: "AES-CBC", iv: iv },
        key,
        encodedData
    );
    const encryptedArray = new Uint8Array(encryptedContent);
    const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
    const ivHex = Array.from(iv).map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return { encryptedData: encryptedBase64, iv: ivHex };
  }

  async function decryptData(encryptedPayload) {
    const [encryptedData, ivHex] = encryptedPayload.split('|_|_|');
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const key = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "AES-CBC", length: 256 },
        false,
        ["decrypt"]
    );
    const decryptedContent = await window.crypto.subtle.decrypt(
        { name: "AES-CBC", iv: iv },
        key,
        new Uint8Array(atob(encryptedData).split("").map(char => char.charCodeAt(0)))
    );
    return decoder.decode(decryptedContent);
  }

  async function apiCall(url, data) {
    const payload = JSON.stringify(data);
    const { encryptedData, iv } = await encryptData(payload);
    const response = await fetch('/api' + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: encryptedData + '|_|_|' + iv
    });
    const encryptedPayload = await response.text();
    const decryptedResponse = await decryptData(encryptedPayload);
    let jsonResponse;
    try {
        jsonResponse = JSON.parse(decryptedResponse);
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
    if( jsonResponse.notification ) {
      notify(jsonResponse.notification);
    }
    return jsonResponse;
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
      await updateACL(data.token);
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
      await updateACL(data.token);
      errorMessage = '';
    } catch (error) {
      console.error(error);
      errorMessage = 'Could not complete refresh';
    } finally {
      isProcessing = false;
    }
  }

  async function updateACL(authToken) {
    try {
      const response = await apiCall("/acl", { token: authToken });
      if (!response.ok) throw new Error('Could not fetch ACL');
      const data = response;
      acl.set(data.acl);
    } catch (error) {
      console.error(error);
    }
  }

</script>

{#if !$token}
<div class="container h-screen bg-gray-200 w-full flex justify-center items-center">
  <form on:submit|preventDefault={login} class="w-40 h-40">
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
  }
  .container {
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