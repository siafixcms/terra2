<script>
    import Layout from '../../components/Layout.svelte';
    import InfiniteTable from '../../components/InfiniteTable.svelte';
    import PopupButton from '../../components/PopupForm.svelte';
</script>

<Layout>
    <h2 class="text-2xl font-semibold text-gray-800 my-4">Rooms</h2>

    <div class="flex justify-end mb-4">
        <PopupButton importbaseUrl={'rooms'} action={'add'} title={'Add a new room'} buttonName={'Add room'} class="ml-auto" />
    </div>
    
    <InfiniteTable importbaseUrl={'rooms'} visibleFields={['name', 'registered', 'updated']} />
      
</Layout>
