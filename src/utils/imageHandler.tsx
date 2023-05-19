import Constants from "../constants";
import { Product } from "../services/product";
const { devServerUrl } = Constants


export type ImageFormatTypes = 'large' | 'medium' | 'small' | 'thumbnail';

export default function imageHandler(imageResponse: Product["photo"], format?: ImageFormatTypes) {
  const photoAttributes = imageResponse?.data![0].attributes;
  if (format && photoAttributes?.formats) {
    return devServerUrl + photoAttributes?.formats[format].url
  } else {
    return devServerUrl + photoAttributes?.url
  }
}