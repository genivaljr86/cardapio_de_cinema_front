import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import currencyFilter from "../../utils/currencyFilter"
import { OrderDetail } from "../../services/orderDetail"
import CQuantityInput from "../inputs/CQuantityInput"
import imageHandler from "../../utils/imageHandler"
import { Product } from "../../services/product"
import CProductLabel from "../CProductLabel"
import { Animation } from 'react-animate-style'

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
  handleChangeQuantity: (quantity: any, index: number) => void,
  footer?: () => React.ReactNode
}

interface CCartTableItem extends OrderDetail {
  photo: Product['photo']
}


const CCartTable: React.FC<CCartTableParams> = ({ orderDetails, handleChangeQuantity, footer }) => {
  /**
   * @todo Create variable to change `isInvisible` on removeitem
   */
  const animate = (children: React.ReactNode) => {
    return (
      <Animation animationIn="fadeInLeft" animationInDuration={200} isVisible={true} >
        {children}
      </Animation>
    )
  }
  return (
    <>
      <Table
        pagination={false}
        dataSource={
          (orderDetails as CCartTableItem[]).map((order, index) => {
            return ({
              key: index,
              name: animate(<CProductLabel photo={imageHandler(order?.photo, 'thumbnail')} name={order?.name} />),
              price: animate(currencyFilter(order?.price)),
              quantity: animate(<CQuantityInput
                quantity={order?.quantity}
                index={index}
                handleOnChange={handleChangeQuantity} />),
              amount_price: animate(currencyFilter(order?.amount_price))
            })
          })
        }
        columns={columns}
        footer={footer}
      />
    </>
  )
}

export default CCartTable