<script>
    export let data;
    let final_data = data;
    let query;
    function handleChange(key) {
        for(let i=0; i<final_data.length; i++){
            if(final_data[i].id == key){
                final_data[i].active = !final_data[i].active;
            }
        }

    }

    function onSearchInput(){
        final_data = data.filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase());
        });
    }
</script>
<input class="w-1/2 p-2 mb-3 border rounded" bind:value={query} on:input={onSearchInput} placeholder="Search..." />
{#each final_data as role}
<div class="flex items-center space-x-2">
    <input type="{role?.active ? 'checkbox' : 'checkbox'}" class="form-checkbox h-5 w-5 text-blue-600" checked="{role?.active}" on:change={handleChange(role?.id)} />
    <label class="text-gray-700 font-bold">{role?.name}</label>
  </div>
{/each}