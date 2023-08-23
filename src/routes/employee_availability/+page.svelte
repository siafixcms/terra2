<script>
    import { onMount } from 'svelte';
    import Layout from '../../components/Layout.svelte';
    import InfiniteTable from '../../components/InfiniteTable.svelte';
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';

    let plugins = [TimeGrid];
    let options = {
        view: 'timeGridWeek',
        editable: true,
        events: [],
        pointer: true,
        select: function(info) {
            const newEvent = {
                title: 'New Event',
                start: info.start,
                end: info.end,
                allDay: info.allDay
            };
            options.events = [...options.events, newEvent];
        }
    };

    let calendarInstance;

    onMount(() => {
        calendarInstance = new Calendar({
            plugins,
            ...options,
            events: options.events,
            eventClick: function(info) {
                options.events = options.events.filter(event => event !== info.event);
            }
        });
        calendarInstance.renderTo(document.querySelector('#calendar-container'));
    });

    // function saveEventsToDatabase() {
    //     // Make API call to save events to the database
    //     fetch('your-save-events-api-url', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(options.events)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Events saved successfully:', data);
    //     })
    //     .catch(error => {
    //         console.error('Error saving events:', error);
    //     });
    // }
</script>

<Layout>
    <h2>Employee availability</h2>
    
    <Calendar {plugins} {options} />
      
</Layout>

<style>
    
</style>