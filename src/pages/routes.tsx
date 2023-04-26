import { AppPageRoute } from "./app/App";
import LoginPageRoutes from "./login/routes";
import ProductPageRoutes from "./product/routes";

const routes = [
  {
    path: '/',
    element: <h1>Home Page</h1>,
  },
  LoginPageRoutes,
  {
    children: [
      {
        index: true,
        element: <h1>Products HomePage</h1>
      },
      ProductPageRoutes
    ],
    ...AppPageRoute
  }
];

export default routes;