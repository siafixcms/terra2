<script>
    import Login from '../components/Login.svelte';
    let token;
</script>

{#if !$token}
    <Login bind:token={token} />
{:else}
    <div id="all">
        <div id="top">
            <img src="/logo.png" alt="Logo" id="logo" />
            <Login bind:token={token} />
        </div>
        <div id="middle">
            <div id="menu">
                <div class="menu-container">
                    <a href="/users" class="menu-item">Users</a>
                    <a href="/clients" class="menu-item">Clients</a>
                    <a href="/permissions" class="menu-item">Permissions</a>
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
        flex-wrap: wrap;
        height: 100%;
    }

    #middle {
        display: flex;
        flex-wrap: nowrap;
        height: 100%;
    }

    #top {
        flex: 1 1 100%;
        background-color: rgba(32,33,35,1);
        max-height: 40px;
        min-height: 40px;
        border-bottom: 2px solid gray;
        box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
        line-height: 40px;
        display: flex;
        justify-content: end;
        padding: 8px 10px;
    }

    #logo {
        order: -1; /* This ensures the logo is always the first item */
        margin-right: auto; /* This pushes all subsequent items to the end */
    }

    #menu {
        flex: 1 1 30%;
        min-width: 300px;
        max-width: 300px;
        background-color: rgba(32,33,35,1);
        height: 100%;
        overflow: auto;
        margin-right: 20px;
        border-right: 2px solid gray;
        box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
    }

    #body {
        flex: 1 1 70%;
        padding: 20px;
        height: 100%;
    }

    /* Container for the menu */
    .menu-container {
        width: 100%; /* Adjust as needed */
        background-color: inherit; /* Light gray background */
        border: 1px solid #e0e0e0; /* Border around the menu */
        border-radius: 5px; /* Rounded corners */
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
        overflow: hidden; /* Ensures inner items don't overflow the rounded corners */
    }

    /* Individual menu items */
    .menu-item {
        display: block; /* Make each item a block element */
        padding: 10px 20px; /* Padding for each item */
        color: #fff; /* Text color */
        text-decoration: none; /* Remove underline for links */
        font-size: 16px; /* Adjust font size as needed */
        font-weight: 500; /* Semi-bold font weight */
        border-bottom: 1px solid #e0e0e0; /* Separator between items */
        transition: background-color 0.3s; /* Smooth transition for hover effect */
    }

    /* Hover effect for menu items */
    .menu-item:hover {
        background-color: #e0e0e0; /* Change background color on hover */
        color: #000; /* Darker text color on hover */
    }

    /* Remove border for the last menu item */
    .menu-item:last-child {
        border-bottom: none;
    }

</style>