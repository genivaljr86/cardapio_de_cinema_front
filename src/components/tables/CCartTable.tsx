import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import currencyFilter from "../../utils/currencyFilter"
import { OrderDetail } from "../../services/orderDetail"
import CQuantityInput from "../inputs/CQuantityInput"
import imageHandler from "../../utils/imageHandler"
import { Product } from "../../services/product"
import CProductLabel from "../CProductLabel"

const columns: ColumnsType<any> = [
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

type CCartTableParams = {
  orderDetails: OrderDetail[];
  handleChangeQuantity: (quantity: any, index: number) => void
}

interface CCartTableItem extends OrderDetail {
  photo: Product['photo']
}


const CCartTable: React.FC<CCartTableParams> = ({ orderDetails, handleChangeQuantity }) => {
  return (
    <>
      <Table
        pagination={false}
        dataSource={
          (orderDetails as CCartTableItem[]).map((order, index) => {
            return ({
              key: index,
              name: <CProductLabel photo={imageHandler(order?.photo, 'thumbnail')} name={order?.name} />,
              price: currencyFilter(order?.price),
              quantity: <CQuantityInput
                quantity={order?.quantity}
                index={index}
                handleOnChange={handleChangeQuantity} />,
              amount_price: currencyFilter(order?.amount_price)
            })
          })
        }
        columns={columns}
      />
    </>
  )
}

export default CCartTable