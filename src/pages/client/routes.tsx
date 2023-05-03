import { ClientCreatePageRoute } from "./ClientCreatePage";
import { ClientEditPageRoute } from "./ClientEditPage";
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
    ClientViewPageRoute,
    ClientEditPageRoute
  ]
};

export default ClientPageRoutes;