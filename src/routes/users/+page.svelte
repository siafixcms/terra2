<script>
    import Layout from '../../components/Layout.svelte';
    import InfiniteTable from '../../components/InfiniteTable.svelte';
</script>

<Layout>
    <h2 class="text-2xl font-semibold text-gray-800 my-4">Users</h2>
    
    <InfiniteTable importbaseUrl={'users'} visibleFields={['login', 'name', 'surname']} />
      
</Layout>
