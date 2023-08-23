<script>
    import { onMount } from 'svelte';
    import Layout from '../../components/Layout.svelte';
    // import InfiniteTable from '../../components/InfiniteTable.svelte'; // Commented out for troubleshooting
    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';

    let plugins = [TimeGrid];
    let options = {
        view: 'timeGridWeek',
        editable: true,
        events: [],
        pointer: true,
        select: function(info) {
            // Commented out for troubleshooting
            /*
            const newEvent = {
                title: 'New Event',
                start: info.start,
                end: info.end,
                allDay: info.allDay
            };
            options.events = [...options.events, newEvent];
            */
        }
    };

    let calendarInstance;

    onMount(() => {
        calendarInstance = new Calendar({
            plugins,
            ...options,
            events: options.events,
            eventClick: function(info) {
                // Commented out for troubleshooting
                // options.events = options.events.filter(event => event !== info.event);
            }
        });
        // Commented out for troubleshooting
        // calendarInstance.renderTo(document.querySelector('#calendar-container'));
    });

    function saveEventsToDatabase() {
        // Commented out for troubleshooting
        /*
        fetch('your-save-events-api-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options.events)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Events saved successfully:', data);
        })
        .catch(error => {
            console.error('Error saving events:', error);
        });
        */
    }
</script>

<Layout>
    <h2>Employee availability</h2>
    
    <!-- Commented out for troubleshooting -->
    <!-- <Calendar {plugins} {options} /> -->
    <div id="calendar-container"></div>
      
</Layout>

<style>
    
</style>
