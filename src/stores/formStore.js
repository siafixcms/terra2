import { writable } from "svelte/store";

const formStore = writable({
  layout: null,
  handleSubmit: null,
  defaultData: null
});

export default formStore;
