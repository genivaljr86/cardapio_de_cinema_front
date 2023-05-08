import { RouteObject } from "react-router-dom";
import { OrderListPageRoute } from "./OrderListPage";
import { OrderCreatePageRoute } from "./OrderCreatePage";
import { OrderViewPageRoute } from "./OrderViewPage";

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