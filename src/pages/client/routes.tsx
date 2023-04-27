import { ClientCreatePageRoute } from "./ClientCreatePage";
import { ClientListPageRoute } from "./ClientListPage"


const ClientPageRoutes = {
  path: 'clients',
  children: [
    ClientListPageRoute,
    ClientCreatePageRoute
  ]
}
console.log('ClientPageRoutes', ClientPageRoutes);
export default ClientPageRoutes;