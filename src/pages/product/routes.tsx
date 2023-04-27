import { ProductListRoute } from "./ProductListPage";

const ProductPageRoutes = {
  path: 'products',
  children: [
    ProductListRoute
  ]
}
  ;
export default ProductPageRoutes;