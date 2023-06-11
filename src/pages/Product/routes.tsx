import { ProductCreatePageRoute } from "./Create";
import { ProductEditPageRoute } from "./Edit";
import { ProductListRoute } from "./List";
import { ProductViewPageRoute } from "./View";

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