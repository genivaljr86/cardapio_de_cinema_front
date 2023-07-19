import { useState } from "react";
import { AxiosError } from "axios";

const useClientListPageHooks = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(null)
  const [error, setError] = useState<AxiosError | undefined>(undefined)

  return {
    dataSource, setDataSource,
    loading, setLoading,
    totalRecords, setTotalRecords,
    error, setError
  }
}

export default useClientListPageHooks