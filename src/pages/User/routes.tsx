import { RouteObject } from "react-router-dom";
import { UserListPageRoute } from "./List";

const UserPageRoutes: RouteObject = {
  path: 'users',
  handle: {
    label: 'Usuários',
  },
  children: [
    UserListPageRoute
  ]
}

export default UserPageRoutes;