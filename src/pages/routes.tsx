import { redirect } from "react-router-dom";
import App from "./app/App";
import ClientPageRoutes from "./client/routes";
import LoginPageRoutes from "./login/routes";
import ProductPageRoutes from "./product/routes";
import ErrorPage from "./error/ErrorPage";
import OrderPageRoutes from "./order/routes";

const HomePageRoute = {
  index: true,
  element: <h1>HomePage</h1>
};

const AppSubRoutes = {
  path: '/app',
  element: <App />,
  handle: {
    label: 'Home'
  },
  children: [
    HomePageRoute,
    ClientPageRoutes,
    ProductPageRoutes,
    OrderPageRoutes
  ]
};

const routes = [
  {
    path: '/',
    loader: async () => redirect('/app'),
    errorElement: <ErrorPage />,

  },
  LoginPageRoutes,
  AppSubRoutes
];

export default routes;