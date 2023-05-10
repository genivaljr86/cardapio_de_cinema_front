import axios, { AxiosInstance } from "axios";
import Constants from "../constants";
import { isEmpty } from 'lodash'

const { devApi, devToken } = Constants;

export const request: AxiosInstance = axios.create({
  baseURL: devApi,
  headers: { 'Authorization': `Bearer ${devToken}` },
  transformResponse: [(data, header, status) => {
    let dataHandled = JSON.parse(data);
    if (isEmpty(dataHandled.meta) && status === 200) {
      dataHandled = dataHandled.data
    }
    return dataHandled
  }]
})