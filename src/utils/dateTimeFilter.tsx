import dayjs from "dayjs";

/**
 * Filter to show date in Brazilian format
 * @param value Date to be converted
 * @returns Converted date. e.g: terça-feira, 23 de maio de 2023
 */
export default function dateTimeFilter(value: string, opts?: Object) {
  return value === undefined ? '' : new Intl.DateTimeFormat('pt-BR', { ...opts, dateStyle: 'full' }).format(new Date(value));
}
/**
 * Filter to send date in server format
 * @param value Date to be converted
 * @returns Converted date. e.g: 2023-05-31
 */
export const dateRequestFilter = (value: string) => dayjs(value).toISOString();
