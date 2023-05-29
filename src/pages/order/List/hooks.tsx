import { useState } from "react";
import Constants from "../../../constants";
import { AxiosError } from "axios";
import { TablePaginationConfig } from "antd";

interface TableParams {
  pagination?: TablePaginationConfig;
}

const useOrderListPageHooks = () => {
  const { PAGINATION: { PAGE_SIZE: pageSize } } = Constants;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize
    },
  });

  return {
    dataSource, setDataSource,
    tableParams, setTableParams,
    loading, setLoading,
    error, setError
  }
}

export default useOrderListPageHooks