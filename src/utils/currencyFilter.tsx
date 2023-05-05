/**
 * Filter to show price in Brazilian currency
 * @param value Number to be converted
 * @returns Converted value. e.g: R$4,20
 */
const currencyFilter = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default currencyFilter;
