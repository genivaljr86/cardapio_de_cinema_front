import { useState } from "react";

const useProductListPageHooks = () => {
  const [dataSource, setdataSource] = useState([]);
  const [loading, setLoading] = useState(false)
  const [totalRecords, setTotalRecords] = useState(null)

  return {
    dataSource, setdataSource,
    loading, setLoading,
    totalRecords, setTotalRecords,
  }
}

export default useProductListPageHooks