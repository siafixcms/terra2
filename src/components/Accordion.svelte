<script>
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    export let content = [];
</script>

<Accordion>
    {#each content as { header, body }}
        <AccordionItem>
            <span slot="header">{header}</span>
            <div>{@html body}</div> <!-- Use @html to render HTML strings -->
        </AccordionItem>
    {/each}
</Accordion>
