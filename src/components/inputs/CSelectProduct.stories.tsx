import { Meta } from "@storybook/react"
import { action } from '@storybook/addon-actions'
import CSelectProduct from "./CSelectProduct"
import { OptionProps } from "antd/es/select"

const meta: Meta = {
  component: CSelectProduct,
  title: 'Organisms/CSelectProduct',
  excludeStories: /.*Data$/,

}
export default meta

const productListOptions: OptionProps[] = [
  {
    value: 1,
    label: 'Produto 1',
    children: <></>
  },
  {
    value: 2,
    label: 'Produto 2',
    children: <></>
  }
]

export const CSelectProductData = {
  productListOptions
}

export const CSelectProductActionsData = {
  handleChangeProduct: action('handleChangeProduct'),
  handleSelectProduct: action('handleSelectProduct'),
}

export const Default = () => <CSelectProduct {...CSelectProductData} {...CSelectProductActionsData} />
export const Loading = () => <CSelectProduct productListOptions={[]} {...CSelectProductActionsData} loading={true} />