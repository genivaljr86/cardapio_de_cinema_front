import { TablePaginationConfig } from "antd";
import Constants from "../../../constants";
import { useState } from "react";
import modal from "../../feedback/modal";

interface TableParams {
  pagination?: TablePaginationConfig;
}

const useCTableHooks = () => {
  const { PAGINATION: { PAGE_SIZE: pageSize } } = Constants;
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: pageSize,
    },
  });
  const Modal = modal()
  return {
    tableParams, setTableParams,
    Modal
  }
}

export default useCTableHooks