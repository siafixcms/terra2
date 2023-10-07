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

<input bind:value={data.name} type="text" placeholder="Name" required />

<style>
    input {
        margin: 10px;
    }
</style>