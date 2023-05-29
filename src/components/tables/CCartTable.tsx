import { Card, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import currencyFilter from "../../utils/currencyFilter"
import { OrderDetail } from "../../services/orderDetail"
import CQuantityInput from "../inputs/CQuantityInput"

const columns: ColumnsType<any> = [
  {
    title: 'Nome',
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

type CCartTableParams = {
  orderDetails: OrderDetail[];
  handleChangeQuantity: (quantity: any, index: number) => void
}


const CCartTable: React.FC<CCartTableParams> = ({ orderDetails, handleChangeQuantity }) => {
  return (
    <>
      <Table
        pagination={false}
        dataSource={
          orderDetails.map((order, index) => ({
            key: index,
            name: order?.name,
            price: currencyFilter(order?.price),
            quantity: <CQuantityInput
              quantity={order?.quantity}
              index={index}
              handleOnChange={handleChangeQuantity}
            />,
            amount_price: currencyFilter(order?.amount_price)
          }))
        }
        columns={columns}
      />
    </>
  )
}

export default CCartTable