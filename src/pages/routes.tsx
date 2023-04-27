import App from "./app/App";
import ClientPageRoutes from "./client/routes";
import LoginPageRoutes from "./login/routes";
import ProductPageRoutes from "./product/routes";

const HomePageRoute = {
  index: true,
  element: <h1>HomePage</h1>
};

const AppSubRoutes = {
  path: '/app',
  element: <App />,
  children: [
    HomePageRoute,
    ClientPageRoutes,
    ProductPageRoutes
  ]
};

const routes = [
  {
    path: '/',
    element: <h1>Initial Page</h1>,

  },
  LoginPageRoutes,
  AppSubRoutes
];

export default routes;