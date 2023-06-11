import { useParams } from "react-router-dom";
import { ClientResponseDataObject } from "../../../services/client";
import { useState } from "react";
import { AxiosError } from "axios";

const useClientViewPageHooks = () => {
  const { id } = useParams();
  const [clientDataAttributes, setclientDataAttributes] = useState({} as ClientResponseDataObject['attributes']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const [ordersList, setOrdersList] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  return {
    id,
    clientDataAttributes, setclientDataAttributes,
    ordersList, setOrdersList,
    ordersLoading, setOrdersLoading,
    loading, setLoading,
    error, setError
  }
}

export default useClientViewPageHooks 