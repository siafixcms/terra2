<script>
    import Layout from '../../components/Layout.svelte';
    import InfiniteTable from '../../components/InfiniteTable.svelte';
    import PopupButton from '../../components/PopupForm.svelte';
</script>

<Layout>
    <h2 class="text-2xl font-semibold text-gray-800 my-4">Specialists</h2>
    
    <InfiniteTable importbaseUrl={'specialists'} visibleFields={['name', 'created', 'updated']} buttonName={'Add specialist'}/>
      
</Layout>
