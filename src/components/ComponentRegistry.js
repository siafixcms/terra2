import ClientsAdd from './FormLayouts/ClientsAdd.svelte';
import RoomsAdd from './FormLayouts/RoomsAdd.svelte';
import SpecialistsAdd from './FormLayouts/SpecialistsAdd.svelte';

const componentRegistry = {
  'ClientsAdd': ClientsAdd,
  'RoomsAdd': RoomsAdd,
  'SpecialistsAdd': SpecialistsAdd,
};

export default componentRegistry;
