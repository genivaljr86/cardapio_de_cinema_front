import { request } from "../utils/request";

export interface FileObj {
  files: File[]
}
export function postFile(data: any, params?: any) {
  return request.post(`/upload`, data, { params })
}