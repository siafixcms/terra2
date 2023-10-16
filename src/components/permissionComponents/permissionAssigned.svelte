<script>
    import Accordion from "./Accordion.svelte";
    let query = '';
    let data = [{
        name: 'permission1',
        data:[{
            name:'Adming',
            active: true
        },{
            name:'User',
            active: true
        }]
    },
    {
        name: 'group2',
        data:[{
            name:'worker',
            active: true
        },{
            name:'shaper',
            active: true
        }]
    }]

    let final_data = data;

    function onSearchInput(){
        final_data = data.filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase());
        });
    }
</script>
<input class="w-1/2 p-2 mb-3 border rounded" bind:value={query} on:input={onSearchInput} placeholder="Search..." />

<div class="flex flex-col gap-3 w-full justify-start">
    {#each final_data as item,index}
        <Accordion show={index==0} headerHeight="h-12" headerClass="rounded-lg" title={item?.name}>
            <div class="slot w-full">
                {#each item?.data as role}
                <div class="flex justify-start w-full space-x-2">
                    <input type="{role?.active ? 'checkbox' : 'checkbox'}" class="form-checkbox h-5 w-5 text-blue-600" checked="{role?.active}" />
                    <label class="text-gray-700 font-bold">{role?.name}</label>
                </div>
            {/each}
            </div>

        </Accordion>
    {/each}
</div>