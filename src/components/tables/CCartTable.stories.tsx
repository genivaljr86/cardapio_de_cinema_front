import { action } from '@storybook/addon-actions'
import { Meta } from "@storybook/react"
import CCartTable from "./CCartTable"

const meta: Meta = {
  component: CCartTable,
  title: 'Organisms/CCartTable',
  excludeStories: /.*Data$/,
}
export default meta

export const CCartOneData = {
  orderDetails: [
    {
      "product_id": 2,
      "quantity": 1,
      "amount_price": 20.55,
      "name": "Pão Sírio",
      "price": 20.55
    }
  ]
}

export const CCartMultipleData = {
  orderDetails: [
    {
      "product_id": 2,
      "quantity": 1,
      "amount_price": 20.55,
      "name": "Pão Sírio",
      "price": 20.55
    },
    {
      "product_id": 8,
      "quantity": 1,
      "amount_price": 45.45,
      "name": "Pizza de Brocolis",
      "price": 45.45
    }
  ],
}

export const CCartActionsData = {
  handleChangeQuantity: action('handleChangeQuantity')
}

export const Default = () => <CCartTable {...CCartOneData} {...CCartActionsData} />
export const Multiple = () => <CCartTable {...CCartMultipleData} {...CCartActionsData} />
export const Empty = () => <CCartTable orderDetails={[]} {...CCartActionsData} />