<script>
    let isOpen = false;
</script>

<button on:click={() => isOpen = !isOpen}>
    {isOpen ? 'Close Filters' : 'Open Filters'}
</button>

<div class="{isOpen ? 'open' : 'closed'}">
    <slot></slot>
</div>

<style>
    .open {
        display: block;
    }
    .closed {
        display: none;
    }
</style>
