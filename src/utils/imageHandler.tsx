import Constants from "../constants";
import { Product } from "../services/product";
const { devServerUrl } = Constants

export enum ImageFormatTypes {
  large = 'large',
  medium = 'medium',
  small = 'small',
  thumbnail = 'thumbnail'
}

export default function imageHandler(imageResponse: Product["photo"], format?: ImageFormatTypes) {
  if (format) {
    return devServerUrl + imageResponse?.data![0].attributes?.formats[format].url
  } else {
    return devServerUrl + imageResponse?.data![0].attributes?.url
  }
}