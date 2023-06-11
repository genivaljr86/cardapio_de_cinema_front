import { useState } from "react";
import Constants from "../../../constants";
import { AxiosError } from "axios";
import modal from "../../../components/feedback/modal";

const useClientListPageHooks = () => {
  const { PAGINATION: { PAGE_SIZE: pageSize } } = Constants;

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const Modal = modal()

  return {
    pageSize,
    dataSource, setDataSource,
    loading, setLoading,
    error, setError,
    Modal
  }
}

export default useClientListPageHooks