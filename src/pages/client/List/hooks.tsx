import { useState } from "react";
import Constants from "../../../constants";
import { AxiosError } from "axios";

const useClientListPageHooks = () => {
  const { pagination: { pageSize } } = Constants;

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | undefined>(undefined)

  return {
    pageSize,
    dataSource, setDataSource,
    loading, setLoading,
    error, setError
  }
}

export default useClientListPageHooks