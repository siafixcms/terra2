<script>
    import Layout from '../../components/Layout.svelte';
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';

    let plugins = [TimeGrid];
    let options = {
        view: 'timeGridWeek',
        editable: true,
        events: [
            
        ],
        pointer: true,
        select: function(info) {
            console.log(info);
        }
    };
</script>

<Layout>
    <h2>Employee availability</h2>
    
    <Calendar {plugins} {options} />
      
</Layout>

<style>
    
</style>