<script>
    import Accordion from "./Accordion.svelte";
    let query = "";
    let data = [
        {
            name: "permission1",
            show: true,
            data: [
                {
                    name: "Adming",
                    active: true,
                    show: true,
                },
                {
                    name: "User",
                    active: true,
                    show: true,
                },
            ],
        },
        {
            name: "group2",
            show: true,
            data: [
                {
                    name: "worker",
                    active: true,
                    show: true,
                },
                {
                    name: "shaper",
                    active: true,
                    show: true,
                },
            ],
        },
    ];

    function onSearchInput() {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase().includes(query.toLowerCase())) {
                data[i].show = true;
                for (let j = 0; j < data[i].data.length; j++) {
                    data[i].data[j].show = true;
                }
            } else {
                let count = 0;
                for (let j = 0; j < data[i].data.length; j++) {
                    if (
                        data[i].data[j].name
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    ) {
                        data[i].data[j].show = true;
                        count++;
                    } else {
                        data[i].data[j].show = false;
                    }
                }
                if (count == 0) data[i].show = false;
            }
        }
    }
</script>

<input
    class="w-1/2 p-2 mb-3 border rounded"
    bind:value={query}
    on:input={onSearchInput}
    placeholder="Search..."
/>

<div class="flex flex-col gap-3 w-full justify-start">
    {#each data as item, index}
        {#if item.show}
            <Accordion
                show={index == 0}
                headerHeight="h-12"
                headerClass="rounded-lg"
                title={item?.name}
            >
                <div class="slot w-full">
                    {#each item?.data as role}
                        {#if role.show}
                            <div class="flex justify-start w-full space-x-2">
                                <input
                                    type={role?.active
                                        ? "checkbox"
                                        : "checkbox"}
                                    class="form-checkbox h-5 w-5 text-blue-600"
                                    checked={role?.active}
                                />
                                <label class="text-gray-700 font-bold" id={role?.name} for="roleConfig"
                                    >{role?.name}</label
                                >
                            </div>
                        {/if}
                    {/each}
                </div>
            </Accordion>
        {/if}
    {/each}
</div>
