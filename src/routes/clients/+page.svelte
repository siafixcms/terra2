<script>
    import Layout from '../../components/Layout.svelte';
    import InfiniteTable from '../../components/InfiniteTable.svelte';
    import PopupButton from '../../components/PopupButton.svelte';
    let context = { data: null };
</script>

<Layout>

    <h2 class="text-2xl font-semibold text-gray-800 my-4">Clients</h2>

    <PopupButton {context} />
    
    <InfiniteTable importbaseUrl={'clients'} />
    
</Layout>
