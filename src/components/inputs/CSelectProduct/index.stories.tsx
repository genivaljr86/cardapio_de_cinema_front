import { Meta, StoryObj } from "@storybook/react"
import { ProductListResponseDataItem } from "../../../services/product"
import CSelectProduct from "."

const meta: Meta = {
  component: CSelectProduct,
  title: 'Organisms/CSelectProduct',
  excludeStories: /.*Data$/,
  args: {
    onChangeProduct: {
      action: 'onChangeProduct'
    },
    onSelectProduct: {
      action: 'onSelectProduct'
    }
  }
}
export default meta

const products: ProductListResponseDataItem[] =
  [
    {
      "id": 1,
      "attributes": {
        "name": "Nhoque de Espinafre",
        "price": 45.25,
        "createdAt": "2023-04-20T22:40:39.524Z",
        "updatedAt": "2023-06-01T00:07:42.339Z",
        "description": "Tem quem goste"
      }
    },
    {
      "id": 2,
      "attributes": {
        "name": "Pão Sírio",
        "price": 20.55,
        "createdAt": "2023-04-20T22:40:59.499Z",
        "updatedAt": "2023-05-23T22:59:49.288Z",
        "description": undefined
      }
    },
    {
      "id": 3,
      "attributes": {
        "name": "Raviolli de Presunto",
        "price": 50,
        "createdAt": "2023-04-24T17:24:31.977Z",
        "updatedAt": "2023-05-22T19:24:56.069Z",
        "description": "Ótimo prato"
      }
    },
    {
      "id": 8,
      "attributes": {
        "name": "Pizza de Brocolis",
        "price": 45.45,
        "createdAt": "2023-05-05T22:37:18.754Z",
        "updatedAt": "2023-05-22T19:26:28.646Z",
        "description": undefined
      }
    },
    {
      "id": 9,
      "attributes": {
        "name": "Maniçoba",
        "price": 22.52,
        "createdAt": "2023-05-10T02:32:02.704Z",
        "updatedAt": "2023-05-22T19:26:45.068Z",
        "description": "Delicioso prato regional paraense"
      }
    },
    {
      "id": 26,
      "attributes": {
        "name": "Macarronada de Chocolate",
        "price": 25.1,
        "createdAt": "2023-05-22T16:50:43.100Z",
        "updatedAt": "2023-05-31T20:32:19.799Z",
        "description": "Prato muito bom"
      }
    }
  ]

export const CSelectProductData = {
  products
}

type Story = StoryObj<typeof CSelectProduct>


export const Default: Story = {
  args: CSelectProductData
}
export const Loading: Story = {
  args: {
    loading: true,
    ...CSelectProductData
  }
}