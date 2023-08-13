<script>
    import Login from '../components/Login.svelte';
    let token;
</script>

{#if !$token}
    <Login bind:token={token} />
{:else}
    <div id="all">
        <div id="top">
            <Login bind:token={token} />
        </div>
        <div id="menu">

        </div>
        <div id="body">

        </div>
    </div>
{/if}

<style>
    #all {
        display: flex;
        flex-wrap: wrap;
    }

    #top {
        flex: 1 1 100%;
    }

    #menu {
        flex: 1 1 30%;
        min-width: 300px;
        max-width: 300px;
        background-color: rgba(32,33,35,var(--tw-bg-opacity));
        margin-right: 20px;
    }

    #body {
        flex: 1 1 70%;
    }
</style>