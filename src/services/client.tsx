import axios from "axios";
import Constants from "../constants";

const { devApi, devToken } = Constants;
const headerParams = {
  headers: {
    Authorization: `Bearer ${devToken}`
  }
}

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
  id?: number;
  attributes: Client;
}

export interface ClientResponse {
  data?: ClientResponseDataObject;
  meta?: object;
}

export function getClients(params?: any) {
  return axios.get(`${devApi}/clients`,
    {
      params,
      ...headerParams
    }
  )
}

export function getClientByID(id: string) {
  return axios.get(`${devApi}/clients/${id}`, headerParams)
}

export function postClients(data: Client) {
  return axios.post(`${devApi}/clients`,
    {
      data,
      ...headerParams
    }
  )
}

export function putClient(id: string, data: Client) {
  return axios.put(`${devApi}/clients/${id}`,
    {
      data,
      ...headerParams
    }
  )
}

export function deleteClient(id: number) {
  return axios.delete(`${devApi}/clients/${id}`, headerParams)
}