import { useState } from "react";
import Constants from "../../../constants";

const useProductListHooks = () => {
  const { pagination: { pageSize } } = Constants;

  const [dataSource, setdataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  return {
    pageSize,
    dataSource, setdataSource,
    loading, setLoading
  }
}

export default useProductListHooks