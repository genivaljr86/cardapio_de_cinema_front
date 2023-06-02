import { Form } from "antd";
import { useState } from "react";
import { Client } from "../../../services/client";
import { OptionProps } from "antd/es/select";
import { ProductListResponseDataItem } from "../../../services/product";
import { OrderDetail } from "../../../services/orderDetail";
import { useNavigate } from "react-router-dom";

const useOrderCreatePageHooks = () => {
  const [form] = Form.useForm();
  const [clientsList, setClientsList] = useState<Client[]>([])
  const [clientListOptions, setClientListOptions] = useState<OptionProps[]>([])
  const [clientsLoading, setClientsLoading] = useState(false)
  const [productsList, setProductsList] = useState<ProductListResponseDataItem[]>([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
  const [customDelivery, setCustomDelivery] = useState(false)
  const [clientFilled, setClientFilled] = useState(false)
  const [subTotal, setSubtotal] = useState(0)
  const [deliveryTax, setDeliveryTax] = useState(25.5)
  const navigate = useNavigate()
  return {
    form,
    clientsList, setClientsList,
    clientListOptions, setClientListOptions,
    clientsLoading, setClientsLoading,
    productsList, setProductsList,
    productsLoading, setProductsLoading,
    orderDetails, setOrderDetails,
    customDelivery, setCustomDelivery,
    clientFilled, setClientFilled,
    subTotal, setSubtotal,
    deliveryTax, setDeliveryTax,
    navigate
  }
}

export default useOrderCreatePageHooks