<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import CryptoJS from "crypto-js";
  
  // State variables
  let username = "";
  let password = "";
  let system = "terra_balance";
  let secret = "terra_balance_secret";
  const token = writable(null);
  const acl = writable([]);
  let isProcessing = false;
  let errorMessage = "";

  // Load authentication status on startup
  onMount(async () => {
    // get auth and acl if already logged in
    // let's assume you have some methods to retrieve these
  });

  async function logout() {
    isProcessing = true;
    try {
      const payload = JSON.stringify({ system, action: "logout", token });
      const encryptedPayload = CryptoJS.AES.encrypt(payload, secret).toString();
      const response = await fetch("/api/auth", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: encryptedPayload
      });
      if (!response.ok) throw new Error('Could not complete logout');
      token.set(null);
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
      const payload = JSON.stringify({ username, password, system, action: "login" });
      const encryptedPayload = CryptoJS.AES.encrypt(payload, secret).toString();
      const response = await fetch("/api/auth", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: encryptedPayload
      });
      if (!response.ok) throw new Error('Could not complete login');
      const data = await response.json();
      token.set(data.token);
      await updateACL(data.token);
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
      const response = await fetch("/api/auth", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, system, action: "refresh" })
      });
      if (!response.ok) throw new Error('Could not complete refresh');
      const data = await response.json();
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
      const payload = JSON.stringify({ token: authToken });
      const encryptedPayload = CryptoJS.AES.encrypt(payload, secret).toString();
      const response = await fetch("/api/acl", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: encryptedPayload
      });
      if (!response.ok) throw new Error('Could not fetch ACL');
      const data = await response.json();
      acl.set(data.acl);
    } catch (error) {
      console.error(error);
    }
  }
</script>

{#if !$token}
<div class="container">
  <form on:submit|preventDefault={login}>
    <h2 class="left">Terra balance</h2>
    <input bind:value={username} placeholder="Username" required />
    <input bind:value={password} placeholder="Password" type="password" required />
    <button type="submit" disabled={isProcessing}>{isProcessing ? 'Loading...' : 'Login'}</button>
    <p>{errorMessage}</p>
  </form>
</div>
{:else}
  <p>Welcome, you're logged in!</p>
  <button on:click|preventDefault={logout} disabled={isProcessing}>{isProcessing ? 'Processing...' : 'Logout'}</button>
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
    width: 350px;
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
</style>