<script>
    import Layout from '../../components/Layout.svelte';
    import InfiniteTable from '../../components/InfiniteTable.svelte';
    import PopupButton from '../../components/PopupForm.svelte';
</script>

<Layout>
    
    <h2 class="text-2xl font-semibold text-gray-800 my-4">Domains</h2>

    <InfiniteTable importbaseUrl={'domains'} visibleFields={['name', 'status', 'created_on']} headers={{'created_on': 'Created'}} buttonName={'domain'}/>
    
</Layout>
