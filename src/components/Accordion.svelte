<script>
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    export let content = [];
</script>

<Accordion>
    {#each content as { header, body }}
        <AccordionItem>
        <span slot="header">{header}</span>
        <div>{body}</div>
        </AccordionItem>
    {/each}
</Accordion>
