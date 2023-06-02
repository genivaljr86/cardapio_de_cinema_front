import { request } from "../utils/request";

export interface Client {
  name?: string;
  address?: string;
  phone?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface ClientResponseDataObject {
  id: number;
  attributes: Client;
}

export interface ClientResponse {
  data?: ClientResponseDataObject;
  meta?: object;
}

export function getClients(params?: any) {
  return request.get(`/clients`, { params })
}

export function getClientByID(id: string, params?: any) {
  return request.get(`/clients/${id}`, { params })
}

export function postClients(data: Client, params?: any) {
  return request.post(`/clients`, { data }, { params })
}

export function putClient(id: string, data: Client, params?: any) {
  return request.put(`/clients/${id}`, { data }, { params })
}

export function deleteClient(id: number, params?: any) {
  return request.delete(`/clients/${id}`, { params })
}