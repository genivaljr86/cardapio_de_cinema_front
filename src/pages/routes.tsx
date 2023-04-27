import { RouteObject } from "react-router-dom";
import App from "./app/App";
import ClientPageRoutes from "./client/routes";
import LoginPageRoutes from "./login/routes";
import ProductPageRoutes from "./product/routes";

type RouteDomain = RouteObject[]

const HomePageRoute = [{
  index: true,
  element: <h1>HomePage</h1>
}];

/**
 * Inject complex route domains in the App route config
 * @param domains Domains in the app. e.g: Clients, Products, Orders...
 * @returns List of routes in correct format
 */
function handleAppSubRoutes(domains: RouteDomain[]) {
  const subRoutes: RouteObject = {
    path: '/app',
    element: <App />,
    children: []
  }

  domains.forEach((routes) => {
    routes.forEach((route) => {
      subRoutes.children?.push(route)
    })
  });

  return subRoutes;
};



const routes = [
  {
    path: '/',
    element: <h1>Home Page</h1>,

  },
  LoginPageRoutes,
  handleAppSubRoutes([
    HomePageRoute,
    ClientPageRoutes,
    ProductPageRoutes
  ])
];

export default routes;