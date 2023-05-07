import { RouteObject } from "react-router-dom";
import { OrderListPageRoute } from "./OrderListPage";
import { OrderCreatePageRoute } from "./OrderCreatePage";

const OrderPageRoutes: RouteObject = {
  path: 'orders',
  handle: {
    label: 'Vendas'
  },
  children: [
    OrderListPageRoute,
    OrderCreatePageRoute
  ]
}

export default OrderPageRoutes;