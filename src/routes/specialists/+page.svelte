<script>
    import Layout from '../../components/Layout.svelte';
    import InfiniteTable from '../../components/InfiniteTable.svelte';
    import PopupButton from '../../components/PopupForm.svelte';
</script>

<Layout>
    <h2 class="text-2xl font-semibold text-gray-800 my-4">Specialists</h2>

    <div class="flex justify-end mb-4">
        <PopupButton importbaseUrl={'specialists'} action={'add'} title={'Add a new specialist'} buttonName={'Add specialist'} class="ml-auto" />
    </div>
    
    <InfiniteTable importbaseUrl={'specialists'} visibleFields={['name', 'created', 'updated']} />
      
</Layout>
