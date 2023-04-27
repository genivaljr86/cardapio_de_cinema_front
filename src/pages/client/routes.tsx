import { ClientCreatePageRoute } from "./ClientCreatePage";
import { ClientListPageRoute } from "./ClientListPage";


const ClientPageRoutes = {
  path: 'clients',
  handle: {
    label: 'Clientes'
  },
  children: [
    ClientListPageRoute,
    ClientCreatePageRoute
  ]
};

export default ClientPageRoutes;