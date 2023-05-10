import axios from "axios";
import Constants from "../constants";

const { devApi, devToken } = Constants;

export const request = axios.create({
  baseURL: devApi,
  headers: { 'Authorization': `Bearer ${devToken}` }
})