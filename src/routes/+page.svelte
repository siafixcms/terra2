<script>
    import Login from '../components/Login.svelte';
    let token;
</script>

{#if !$token}
    <Login bind:token={token} />
{:else}
    <div>
        <div id="menu">

        </div>
        <div id="top">
            <Login bind:token={token} />
        </div>
        <div id="body">

        </div>
    </div>
{/if}