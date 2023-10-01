<script>
    import Layout from '../../components/Layout.svelte';
    import InfiniteTable from '../../components/InfiniteTable.svelte';
</script>

<Layout>
    <h2 class="text-2xl font-semibold text-gray-800 my-4">Clients</h2>  
    <InfiniteTable importbaseUrl={'clients'} visibleFields={['name', 'reg_num', 'email', 'phone', 'web', 'registered']} headers={{'reg_num': 'Reg num'}} buttonName={'Add client'}/>
</Layout>