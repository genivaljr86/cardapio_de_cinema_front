import { RouteObject } from "react-router-dom";
import { OrderListPageRoute } from "./List";
import { OrderViewPageRoute } from "./View";
import { OrderCreatePageRoute } from "./Create";

const OrderPageRoutes: RouteObject = {
  path: 'orders',
  handle: {
    label: 'Vendas'
  },
  children: [
    OrderListPageRoute,
    OrderCreatePageRoute,
    OrderViewPageRoute
  ]
}

export default OrderPageRoutes;