import axios from "axios";
import Constants from "../constants";

const { devApi, devToken } = Constants;
const headerParams = {
  headers: {
    Authorization: `Bearer ${devToken}`
  }
};


export interface OrderDetail {
  order_id?: object;
  product_id?: {
    data?: {
      id?: number;
      attributes?: object;
    };
  };
  name: string;
  /** @format float */
  price: number;
  /** @format float */
  quantity: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  createdBy?: {
    data?: {
      id?: number;
      attributes?: object;
    };
  };
  updatedBy?: {
    data?: {
      id?: number;
      attributes?: object;
    };
  };
}

export interface OrderDetailResponseDataObject {
  id?: number;
  attributes?: OrderDetail;
}

export function getOrderDetails(params?: any) {
  return axios.get(`${devApi}/order-details`,
    {
      params,
      ...headerParams
    }
  )
}

export function getOrderDetailByID(id: string, params?: any) {
  return axios.get(`${devApi}/order-details/${id}`,
    {
      params,
      ...headerParams
    }
  )
}

export function postOrderDetails(data: OrderDetail, params?: any) {
  return axios.post(`${devApi}/order-details`, { data },
    {
      params,
      ...headerParams
    }
  )
}

export function postBulkOrderDetails(data: OrderDetail[], params?: any) {
  return axios.post(`${devApi}/bulk-order-details`, { data },
    {
      params,
      ...headerParams
    }
  )
}

export function putOrderDetail(id: string, data: OrderDetail, params?: any) {
  return axios.put(`${devApi}/order-details/${id}`, { data },
    {
      params,
      ...headerParams
    }
  )
}

export function deleteOrderDetail(id: number, params?: any) {
  return axios.delete(`${devApi}/order-details/${id}`, headerParams)
}