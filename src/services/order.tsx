import axios from "axios";
import Constants from "../constants";

const { devApi, devToken } = Constants;
const headerParams = {
  headers: {
    Authorization: `Bearer ${devToken}`
  }
};
export interface Order {
  client?: {
    data?: {
      id?: number;
      attributes?: {
        name?: string;
        address?: string;
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
    };
  };
  /** @format float */
  amount_price?: number;
  order_details?: {
    data?: {
      id?: number;
      attributes?: {
        order_id?: {
          data?: {
            id?: number;
            attributes?: {
              client?: {
                data?: {
                  id?: number;
                  attributes?: object;
                };
              };
              /** @format float */
              amount_price?: number;
              order_details?: {
                data?: {
                  id?: number;
                  attributes?: object;
                }[];
              };
              address?: string;
              phone?: string;
              name?: string;
              /** @format date-time */
              delivery_date?: string;
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
        product_id?: {
          data?: {
            id?: number;
            attributes?: {
              name?: string;
              /** @format float */
              price?: number;
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
              order_details?: {
                data?: {
                  id?: number;
                  attributes?: object;
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
          };
        };
        name?: string;
        /** @format float */
        price?: number;
        /** @format float */
        quantity?: number;
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
  address: string;
  phone: string;
  name: string;
  /** @format date-time */
  delivery_date: string;
  /** @format date-time */
  createdAt: string;
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

export interface OrderResponseDataObject {
  id: number;
  attributes: Order;
}

export interface OrderResponse {
  data?: OrderResponseDataObject;
  meta?: object;
}

export function getOrders() {
  return axios.get(`${devApi}/orders`, headerParams)
}

export function getOrderByID(id: string) {
  return axios.get(`${devApi}/orders/${id}`, headerParams)
}

export function postOrders(data: Order) {
  return axios.post(`${devApi}/orders`,
    {
      data,
      ...headerParams
    }
  )
}

export function putOrders(id: string, data: Order) {
  return axios.put(`${devApi}/orders/${id}`,
    {
      data,
      ...headerParams
    }
  )
}

export function deleteOrders(id: number) {
  return axios.delete(`${devApi}/orders/${id}`, headerParams)
}