<script>
    import { onMount, onDestroy } from 'svelte';
    import Layout from '../../components/Layout.svelte';
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

    onDestroy(() => {
        // Clean up the calendar instance when the component is destroyed
        calendarInstance.destroy();
    });

    async function saveEventsToDatabase() {
        try {
            // Make API call to save events to the database
            const response = await fetch('your-save-events-api-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(options.events)
            });

            const data = await response.json();
            console.log('Events saved successfully:', data);
        } catch (error) {
            console.error('Error saving events:', error);
        }
    }

    async function loadEventsFromDatabase() {
        try {
            // Make API call to retrieve events from the database
            const response = await fetch('your-get-events-api-url');
            const data = await response.json();

            // Update events in the options
            options.events = data;
            calendarInstance.refetchEvents(options.events);
        } catch (error) {
            console.error('Error loading events:', error);
        }
    }
</script>

<Layout>
    <h2>Employee availability</h2>
    
    <button on:click={saveEventsToDatabase}>Save Events</button>
    <button on:click={loadEventsFromDatabase}>Load Events</button>
    
    <Calendar {plugins} {options} />
      
</Layout>

<style>
    
</style>
