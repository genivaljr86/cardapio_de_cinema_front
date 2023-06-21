import { request } from "../utils/request";

export interface UsersPermissionsRole {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface UsersDataItem {
  /** @example 1 */
  id?: number;
  /** @example "foo.bar" */
  username?: string;
  /** @example "foo.bar@strapi.io" */
  email?: string;
  /** @example "local" */
  provider?: string;
  /** @example true */
  confirmed?: boolean;
  /** @example false */
  blocked?: boolean;
  /**
   * @format date-time
   * @example "2022-06-02T08:32:06.258Z"
   */
  createdAt?: string;
  /**
   * @format date-time
   * @example "2022-06-02T08:32:06.267Z"
   */
  updatedAt?: string;
}

export interface UserCreatePayload {
  username: string;
  email: string;
  password: string;
  role: number;
}

export function getUsers(params?: any) {
  return request.get(`/users`, { params })
}

export function getUserByID(id: string, params?: any) {
  return request.get(`/users/${id}`, { params })
}

export function postUsers(data: UserCreatePayload, params?: any) {
  return request.post(`/users`, data, { params })
}

export function deleteUsers(id: number, params?: any) {
  return request.delete(`/users/${id}`, { params })
}

