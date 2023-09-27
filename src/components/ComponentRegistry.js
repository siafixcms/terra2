import ClientsAdd from './FormLayouts/ClientsAdd.svelte';
import RoomsAdd from './FormLayouts/RoomsAdd.svelte';
import SpecialistsAdd from './FormLayouts/SpecialistsAdd.svelte';
import UsersAdd from './FormLayouts/UsersAdd.svelte';

const componentRegistry = {
  'ClientsAdd': ClientsAdd,
  'RoomsAdd': RoomsAdd,
  'SpecialistsAdd': SpecialistsAdd,
  'UsersAdd': UsersAdd,
};

export default componentRegistry;
