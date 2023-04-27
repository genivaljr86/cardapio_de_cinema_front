import { ClientCreatePageRoute } from "./ClientCreatePage";
import { ClientListPageRoute } from "./ClientListPage";


const ClientPageRoutes = {
  path: 'clients',
  children: [
    ClientListPageRoute,
    ClientCreatePageRoute
  ]
};

export default ClientPageRoutes;