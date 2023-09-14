<script>
    import { reinitialize } from "../ReinitComponents.js";
    import { create, setBaseUrl } from '../API.js';
    import handleSubmitStore from '../../stores/handleSubmitStore';

    export let data;
    export let importbaseUrl;

    setBaseUrl(importbaseUrl);
    let uniqueId = importbaseUrl + '_table';

    export async function handleSubmit() {
        console.log('HandleSubmit triggered');
        await create(data);
        console.log('create called');
        reinitialize.update(state => {
            state[uniqueId] = true;
            return state;
        });
        console.log('reinit should have happened');
    };

    handleSubmitStore.set(handleSubmit);

    export const defaultData = {
        name: "",
        type: "person",
        jur_address: "",
        fact_address: "",
        email: "",
        reg_num: "",
        phone: "",
        web: ""
    };
</script>

<input bind:value={data.name} type="text" placeholder="Client full name" required />

<style>
    input, select {
        margin: 10px;
    }
</style>