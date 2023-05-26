import { AxiosError } from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductResponseDataObject } from "../../../services/product";

const useProductViewHooks = () => {
  const { id } = useParams();
  const [productDataAttributes, setproductDataAttributes] = useState({} as ProductResponseDataObject['attributes']);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AxiosError>()
  return {
    id,
    productDataAttributes, setproductDataAttributes,
    loading, setLoading,
    error, setError
  }
}

export default useProductViewHooks