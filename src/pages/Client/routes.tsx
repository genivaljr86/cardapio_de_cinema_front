import { ClientCreatePageRoute } from "./Create";
import { ClientEditPageRoute } from "./Edit";
import { ClientListPageRoute } from "./List";
import { ClientViewPageRoute } from "./View";


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