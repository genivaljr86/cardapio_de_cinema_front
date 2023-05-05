import axios from "axios";
import Constants from "../constants";

const { devApi, devToken } = Constants;
const headerParams = {
  headers: {
    Authorization: `Bearer ${devToken}`
  }
};

export interface ProductRequest {
  data: {
    name?: string;
    /** @format float */
    price?: number;
    photo?: (number | string)[];
  };
}

export interface ProductListResponseDataItem {
  id?: number;
  attributes: Product;
}

export interface ProductListResponse {
  data: ProductListResponseDataItem[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface Product {
  name: string;
  /** @format float */
  price: number;
  photo?: {
    data?: {
      id?: number;
      attributes?: {
        name?: string;
        alternativeText?: string;
        caption?: string;
        width?: number;
        height?: number;
        formats?: any;
        hash?: string;
        ext?: string;
        mime?: string;
        /** @format float */
        size?: number;
        url?: string;
        previewUrl?: string;
        provider?: string;
        provider_metadata?: any;
        related?: {
          data?: {
            id?: number;
            attributes?: object;
          }[];
        };
        folder?: {
          data?: {
            id?: number;
            attributes?: {
              name?: string;
              pathId?: number;
              parent?: {
                data?: {
                  id?: number;
                  attributes?: object;
                };
              };
              children?: {
                data?: {
                  id?: number;
                  attributes?: object;
                }[];
              };
              files?: {
                data?: {
                  id?: number;
                  attributes?: {
                    name?: string;
                    alternativeText?: string;
                    caption?: string;
                    width?: number;
                    height?: number;
                    formats?: any;
                    hash?: string;
                    ext?: string;
                    mime?: string;
                    /** @format float */
                    size?: number;
                    url?: string;
                    previewUrl?: string;
                    provider?: string;
                    provider_metadata?: any;
                    related?: {
                      data?: {
                        id?: number;
                        attributes?: object;
                      }[];
                    };
                    folder?: {
                      data?: {
                        id?: number;
                        attributes?: object;
                      };
                    };
                    folderPath?: string;
                    /** @format date-time */
                    createdAt?: string;
                    /** @format date-time */
                    updatedAt?: string;
                    createdBy?: {
                      data?: {
                        id?: number;
                        attributes?: {
                          firstname?: string;
                          lastname?: string;
                          username?: string;
                          /** @format email */
                          email?: string;
                          resetPasswordToken?: string;
                          registrationToken?: string;
                          isActive?: boolean;
                          roles?: {
                            data?: {
                              id?: number;
                              attributes?: {
                                name?: string;
                                code?: string;
                                description?: string;
                                users?: {
                                  data?: {
                                    id?: number;
                                    attributes?: object;
                                  }[];
                                };
                                permissions?: {
                                  data?: {
                                    id?: number;
                                    attributes?: {
                                      action?: string;
                                      subject?: string;
                                      properties?: any;
                                      conditions?: any;
                                      role?: {
                                        data?: {
                                          id?: number;
                                          attributes?: object;
                                        };
                                      };
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
                                    };
                                  }[];
                                };
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
                              };
                            }[];
                          };
                          blocked?: boolean;
                          preferedLanguage?: string;
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
                        };
                      };
                    };
                    updatedBy?: {
                      data?: {
                        id?: number;
                        attributes?: object;
                      };
                    };
                  };
                }[];
              };
              path?: string;
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
            };
          };
        };
        folderPath?: string;
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
      };
    }[];
  };
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
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

export interface ProductResponseDataObject {
  id: number;
  attributes: Product;
}

export interface ProductResponse {
  data?: ProductResponseDataObject;
  meta?: object;
}

export function getProducts() {
  return axios.get(`${devApi}/products`, headerParams)
}

export function getProductByID(id: string) {
  return axios.get(`${devApi}/products/${id}`, headerParams)
}

export function postProducts(data: Product) {
  return axios.post(`${devApi}/products`,
    {
      data,
      ...headerParams
    }
  )
}

export function putProducts(id: string, data: Product) {
  return axios.put(`${devApi}/products/${id}`,
    {
      data,
      ...headerParams
    }
  )
}

export function deleteProducts(id: number) {
  return axios.delete(`${devApi}/products/${id}`, headerParams)
}