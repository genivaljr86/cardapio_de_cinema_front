import { useLocation, useParams } from "react-router-dom";
import { ClientResponseDataObject } from "../../../services/client";
import { useState } from "react";
import { AxiosError } from "axios";

const useClientViewPageHooks = () => {
  const { id } = useParams();
  const [clientData, setclientData] = useState({} as ClientResponseDataObject);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const [ordersList, setOrdersList] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  return {
    id,
    clientData, setclientData,
    ordersList, setOrdersList,
    ordersLoading, setOrdersLoading,
    loading, setLoading,
    error, setError
  }
}

export default useClientViewPageHooks 