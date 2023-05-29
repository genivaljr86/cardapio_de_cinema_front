import { request } from "../utils/request";


export interface OrderDetail {
  order_id?: object;
  product_id?: number | {
    data?: {
      id?: number;
      attributes?: object;
    };
  };
  name: string;
  /** @format float */
  price: number;
  /** @format float */
  amount_price: number;
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
  return request.get(`/order-details`, { params })
}

export function getOrderDetailByID(id: string, params?: any) {
  return request.get(`/order-details/${id}`, { params })
}

export function postOrderDetails(data: OrderDetail, params?: any) {
  return request.post(`/order-details`, { data }, { params })
}

export function postBulkOrderDetails(data: OrderDetail[], params?: any) {
  return request.post(`/bulk-order-details`, { data }, { params })
}

export function putOrderDetail(id: string, data: OrderDetail, params?: any) {
  return request.put(`/order-details/${id}`, { data }, { params })
}

export function deleteOrderDetail(id: number, params?: any) {
  return request.delete(`/order-details/${id}`, { params })
}