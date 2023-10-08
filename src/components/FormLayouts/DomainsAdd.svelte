<script>
    import { reinitialize } from "../ReinitComponents.js";
    import { create, update, setBaseUrl } from '../API.js';
    import handleSubmitStore from '../../stores/handleSubmitStore';

    export let data;
    export let importbaseUrl;

    setBaseUrl(importbaseUrl);
    let uniqueId = importbaseUrl + '_table';

    export async function handleSubmit(data, action) {
        if( action === 'create' ) {
            await create(data);
        }
        if( action === 'edit' ) {
            await update(data);
        }
        reinitialize.update(state => {
            state[uniqueId] = true;
            return state;
        });
    };

    handleSubmitStore.set(handleSubmit);

    export const defaultData = {
        id: "",
        name: "",
        type: "full",
    };
    console.log(data);
</script>

<input bind:value={data.name} type="text" placeholder="Name" required />
<input bind:value={data.type} type="text" placeholder="Type" required />

<style>
    input {
        margin: 10px;
    }
</style>