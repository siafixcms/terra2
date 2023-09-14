<script>
    import { reinitialize } from "../ReinitComponents.js";
    import { create, setBaseUrl } from '../API.js';

    export let data;
    export let importbaseUrl;

    setBaseUrl(importbaseUrl);
    let uniqueId = importbaseUrl + '_table';

    export const handleSubmit = async () => {
        console.log('HandleSubmit triggered');
        await create(data);
        console.log('create called');
        reinitialize.update(state => {
            state[uniqueId] = true;
            return state;
        });
        console.log('reinit should hav happened');
    };

    export let defaultData = {
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
<select bind:value={data.type} required>
    <option value="person">Person</option>
    <option value="company">Company</option>
</select>
<br />
<input bind:value={data.jur_address} type="text" placeholder="Official address" required />
<input bind:value={data.fact_address} type="text" placeholder="Actual address" required />
<br />
<input bind:value={data.email} type="email" placeholder="E-mail address" required />
<input bind:value={data.reg_num} type="text" placeholder="Registration number or personal code or social security number" required />
<br />
<input bind:value={data.phone} type="text" placeholder="Phone number" required />
<input bind:value={data.web} type="text" placeholder="Web page" />

<style>
    input, select {
        margin: 10px;
    }
</style>