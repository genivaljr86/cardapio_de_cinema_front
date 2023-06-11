import { Form } from "antd";
import { useState } from "react";
import { ClientResponseDataObject } from "../../../services/client";
import { ProductListResponseDataItem } from "../../../services/product";
import { OrderDetail } from "../../../services/orderDetail";
import { useNavigate } from "react-router-dom";
import CNotification from "../../../components/feedback/notification";
import modal from "../../../components/feedback/modal";

const useOrderCreatePageHooks = () => {
  const [form] = Form.useForm();
  const [clientsList, setClientsList] = useState<ClientResponseDataObject[]>([])
  const [clientsLoading, setClientsLoading] = useState(false)
  const [productsList, setProductsList] = useState<ProductListResponseDataItem[]>([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
  const [customDelivery, setCustomDelivery] = useState(false)
  const [clientOriginal, setClientOriginal] = useState<ClientResponseDataObject>()
  const [subTotal, setSubtotal] = useState(0)
  const [deliveryTax, setDeliveryTax] = useState(25.5)
  const navigate = useNavigate()
  const notification = CNotification();
  const Modal = modal()
  return {
    form,
    clientsList, setClientsList,
    clientsLoading, setClientsLoading,
    productsList, setProductsList,
    productsLoading, setProductsLoading,
    orderDetails, setOrderDetails,
    customDelivery, setCustomDelivery,
    clientOriginal, setClientOriginal,
    subTotal, setSubtotal,
    deliveryTax, setDeliveryTax,
    navigate,
    notification,
    Modal
  }
}

export default useOrderCreatePageHooks