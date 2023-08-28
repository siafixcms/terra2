<script>
    import { AccordionItem, Accordion } from 'flowbite-svelte';
</script>
  
<Accordion>
<AccordionItem>
    <span slot="header">My Header 1</span>
    <slot></slot>
</AccordionItem>
</Accordion>