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
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
    #all {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;
        height: 100%;
    }

    #top {
        flex: 1 1 100%;
        background-color: rgba(32,33,35,1);
    }

    #menu {
        flex: 1 1 30%;
        min-width: 300px;
        max-width: 300px;
        background-color: rgba(32,33,35,1);
        margin-right: 20px;
    }

    #body {
        flex: 1 1 70%;
        padding: 20px;
    }
</style>