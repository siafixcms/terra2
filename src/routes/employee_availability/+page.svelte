<script>
    import Layout from '../../components/Layout.svelte';
    import InfiniteTable from '../../components/InfiniteTable.svelte';
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';

    let plugins = [TimeGrid];
    let options = {
        view: 'timeGridWeek',
        editable: true,
        events: [
            // your list of events
        ]
    };
</script>

<Layout>
    <h2>Employee availability</h2>
    
    <Calendar {plugins} {options} {pointer: true} />
      
</Layout>

<style>
    
</style>