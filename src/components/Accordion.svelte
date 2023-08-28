<!-- Accordion.svelte -->
<script>
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    export let content = [];
  </script>
  
  <Accordion>
    {#each content as { header, body }}
      <AccordionItem>
        <span slot="header">{header}</span>
        <div class="filter-container">
          {#each body as { component: Comp, props }}
            <Comp {...props} />
          {/each}
        </div>
      </AccordionItem>
    {/each}
  </Accordion>
  
  <style>
    .filter-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  </style>
  