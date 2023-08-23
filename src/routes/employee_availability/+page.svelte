<script>
    import Layout from '../../components/Layout.svelte';
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';

    let plugins = [TimeGrid];
    let options = {
        view: 'timeGridWeek',
        editable: true,
        events: [
            {title: "test", start: "2023-08-23 10:00:00", end: "2023-08-23 15:00:00"}
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