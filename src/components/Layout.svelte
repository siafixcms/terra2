<script>
    import Login from '../components/Login.svelte';
    import Notification from '../components/Notification.svelte';
    import { afterUpdate, tick } from 'svelte';
    let notificationComponent;
    let token;
    let searchValue = '';
    let searchInput;
    let menuItems = [
        { href: '/users', name: 'Users' },
        { href: '/clients', name: 'Clients' },
        { href: '/client-cards', name: 'Client cards' },
        { href: '/permissions', name: 'Permissions' },
        { href: '/rooms', name: 'Rooms' },
        { href: '/specialists', name: 'Specialists' },
        { href: '/employee_availability', name: 'Employee availability' },
        { href: '/appointments', name: 'Appointments' },
        { href: '/warehouse', name: 'Warehouse' },
        { href: '/domains', name: 'Domains' },
    ];
    afterUpdate(async () => {  
        await tick();
        if (searchInput) {
            searchInput.focus();
        }
    });
    $: filteredMenuItems = menuItems.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
</script>

<Notification bind:this={notificationComponent} />
{#if !$token}
    <Login bind:token={token} bind:notificationComponent={notificationComponent} />
{:else}
    <div id="all">
        <div id="top">
            <a href="/" id="logo">
                <img src="/logo.png" alt="Logo" />
            </a>
            <input type="text" placeholder="Search..." id="search" bind:value={searchValue} bind:this={searchInput} autocomplete="off" />
            <Login bind:token={token} bind:notificationComponent={notificationComponent} />
        </div>
        <div id="middle">
            <div id="menu">
                <div class="menu-container">
                    {#each filteredMenuItems as item}
                        <a href={item.href} class="menu-item">{item.name}</a>
                    {/each}
                </div>                
            </div>
            <div id="body">
                <slot></slot>
            </div>
        </div>
    </div>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Vithkuqi:wght@400;700&display=swap');
    #all {
        font-family: 'Noto Serif Vithkuqi', serif;
        display: flex;
        flex-direction: column; /* Change to column direction */
        min-height: 100vh;
    }
    #search {
        padding: 15px;
        background-color: #fff;
        order: -1;
        margin-right: 10px;
        border: 1px solid black;
        margin-left: 15px;
        width: 100%;
        border-radius: 20px;
    }
    #search:focus {
        outline: none;
    }
    #middle {
        display: flex;
        flex-wrap: nowrap;
        flex-grow: 1;
        width: 100%;
    }
    #top {
        background-color: rgba(32,33,35,1);
        max-height: 64px;
        min-height: 64px;
        border-bottom: 2px solid gray;
        box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
        line-height: 64px;
        display: flex;
        justify-content: flex-end;
        padding: 8px 10px;
    }
    #logo {
        order: -1;
        display: inline-block;
    }
    #menu {
        flex: 1 1 30%;
        min-width: 300px;
        max-width: 300px;
        background-color: rgba(32,33,35,1);
        overflow: auto;
        margin-right: 20px;
        box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
    }
    #body {
        flex: 1 1 70%;
        flex-grow: 1;
        padding: 20px;
        width: 100%;
    }
    .menu-container {
        width: 100%;
        background-color: inherit;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    .menu-item {
        display: block;
        padding: 10px 20px;
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        border-bottom: 1px solid #e0e0e0;
        transition: background-color 0.3s;
    }
    .menu-item:hover {
        background-color: #e0e0e0;
        color: #000;
    }
    .menu-item:last-child {
        border-bottom: none;
    }
</style>
