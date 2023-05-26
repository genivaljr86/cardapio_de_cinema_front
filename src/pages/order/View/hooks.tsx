import { useState } from "react";
import { useParams } from "react-router-dom";
import { OrderResponseDataObject } from "../../../services/order";
import { OrderDetailResponseDataObject } from "../../../services/orderDetail";
import { AxiosError } from "axios";

type ClientData = {
  id: number
  name: string;
}

const useOrderViewPageHooks = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState<OrderResponseDataObject['attributes']>()
  const [clientData, setClientData] = useState<ClientData>()
  const [orderDetails, setOrderDetails] = useState<OrderDetailResponseDataObject[]>()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | undefined>(undefined)

  return {
    id,
    orderData, setOrderData,
    clientData, setClientData,
    orderDetails, setOrderDetails,
    loading, setLoading,
    error, setError
  }
}

export default useOrderViewPageHooks