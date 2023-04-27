import { ProductListRoute } from "./ProductListPage";

const ProductPageRoutes = {
  path: 'products',
  children: [
    ProductListRoute
  ],
  handle: {
    label: 'Produtos'
  }
}
  ;
export default ProductPageRoutes;