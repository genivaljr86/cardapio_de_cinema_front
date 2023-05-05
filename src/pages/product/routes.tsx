import { ProductCreatePageRoute } from "./ProductCreatePage";
import { ProductEditPageRoute } from "./ProductEditPage";
import { ProductListRoute } from "./ProductListPage";
import { ProductViewPageRoute } from "./ProductViewPage";

const ProductPageRoutes = {
  path: 'products',
  handle: {
    label: 'Produtos'
  },
  children: [
    ProductListRoute,
    ProductCreatePageRoute,
    ProductViewPageRoute,
    ProductEditPageRoute
  ],
}
  ;
export default ProductPageRoutes;