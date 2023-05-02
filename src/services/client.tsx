import axios from "axios";
import Constants from "../constants";

const { devApi, devToken } = Constants;
const headerParams = {
  headers: {
    Authorization: `Bearer ${devToken}`
  }
}

export type ClientRow = {
  id: number;
  attributes: {
    name: string;
    address: number;
    createdAt: string;
    publishedAt: string;
    updatedAt: string
  }
}
export function getClients() {
  return axios.get(`${devApi}/clients`, headerParams)
}

export function getClientByID(id: string) {
  return axios.get(`${devApi}/clients/${id}`, headerParams)
}