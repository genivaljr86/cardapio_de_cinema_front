import { Meta, StoryObj } from "@storybook/react"
import CTable from "."
import { ColumnsType } from 'antd/es/table'

const meta: Meta = {
  component: CTable,
  title: 'Organisms/CTable',
  excludeStories: /.*Data$/,
  args: {
    columns: [
      {
        title: 'Produto',
        dataIndex: 'name'
      },
      {
        title: 'Preço Unitário',
        dataIndex: 'price',
        align: 'right'
      },
      {
        title: 'Quantidade',
        dataIndex: 'quantity',
        align: 'right'
      },
      {
        title: 'Preço Total',
        dataIndex: 'amount_price',
        align: 'right'
      }
    ]
  }
}
export default meta

export const CTableColumnsData: ColumnsType<any> = [
  {
    title: 'Produto',
    dataIndex: 'name'

  },
  {
    title: 'Preço Unitário',
    dataIndex: 'price',
    align: 'right'
  },
  {
    title: 'Quantidade',
    dataIndex: 'quantity',
    align: 'right'
  },
  {
    title: 'Preço Total',
    dataIndex: 'amount_price',
    align: 'right'
  }
]

export const newCTableOneData = {
  dataSource: [
    {
      key: 1,
      product_id: 2,
      quantity: 1,
      amount_price: 20.55,
      name: "Pão Sírio",
      price: 20.55
    }
  ]
}

export const CTableMultipleData = {
  dataSource: [
    {
      key: 1,
      "product_id": 2,
      "quantity": 1,
      "amount_price": 20.55,
      "name": "Pão Sírio",
      "price": 20.55
    },
    {
      key: 2,
      product_id: 8,
      quantity: 1,
      amount_price: 45.45,
      name: "Pizza de Brocolis",
      price: 45.45
    }
  ]
}

type Story = StoryObj<typeof CTable>

export const Default: Story = {
  args: {
    ...newCTableOneData
  }
}

export const Multiple: Story = {
  args: {
    ...CTableMultipleData
  }
}

export const Empty: Story = {
  args: {
    dataSource: []
  }
}

// export const Default = () => <CTable {...newCTableOneData} />
// export const Multiple = () => <CTable {...CTableMultipleData} />
// export const Empty = () => <CTable dataSource={[]} />