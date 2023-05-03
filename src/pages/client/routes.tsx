import { ClientCreatePageRoute } from "./ClientCreatePage";
import { ClientListPageRoute } from "./ClientListPage";
import { ClientViewPageRoute } from "./ClientViewPage";


const ClientPageRoutes = {
  path: 'clients',
  handle: {
    label: 'Clientes'
  },
  children: [
    ClientListPageRoute,
    ClientCreatePageRoute,
    ClientViewPageRoute
  ]
};

export default ClientPageRoutes;