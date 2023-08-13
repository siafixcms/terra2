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
        <div id="middle">
            <div id="menu">

            </div>
            <div id="body">

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
</style>