import { useState } from "react";
import Constants from "../../../constants";
import { TablePaginationConfig } from "antd";
import modal from "../../../components/feedback/modal";

interface TableParams {
  pagination?: TablePaginationConfig;
}

const useProductListPageHooks = () => {
  const { PAGINATION: { PAGE_SIZE: pageSize } } = Constants;

  const [dataSource, setdataSource] = useState([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize,
    },
  });
  const [loading, setLoading] = useState(false);
  const Modal = modal()

  return {
    dataSource, setdataSource,
    loading, setLoading,
    tableParams, setTableParams,
    Modal
  }
}

export default useProductListPageHooks