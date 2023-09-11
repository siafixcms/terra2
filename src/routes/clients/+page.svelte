<script>
    import Layout from '../../components/Layout.svelte';
    import InfiniteTable from '../../components/InfiniteTable.svelte';
    import PopupButton from '../../components/PopupForm.svelte';
</script>

<Layout>

    <h2 class="text-2xl font-semibold text-gray-800 my-4">Clients</h2>

    <PopupButton importbaseUrl={'clients'} title={'Add a new client'} buttonName={'Add client'} />
    
    <InfiniteTable importbaseUrl={'clients'} />
    
</Layout>
