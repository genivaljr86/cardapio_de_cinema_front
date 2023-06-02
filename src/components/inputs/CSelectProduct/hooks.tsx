import { useState } from "react"
import { ProductListResponseDataItem } from "../../../services/product"

const useCSelectProductHooks = () => {
  const [productSelected, setProductSelected] = useState<ProductListResponseDataItem>()
  const [selected, setSelected] = useState<any>()
  return {
    productSelected, setProductSelected,
    selected, setSelected
  }
}

export default useCSelectProductHooks