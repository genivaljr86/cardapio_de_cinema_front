import { redirect } from "react-router-dom";
import App from "./app/App";
import ClientPageRoutes from "./Client/routes";
import LoginPageRoutes from "./Login/routes";
import ProductPageRoutes from "./Product/routes";
import ErrorPage from "./Error/ErrorPage";
import OrderPageRoutes from "./Order/routes";

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