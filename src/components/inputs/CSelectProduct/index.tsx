import { Button, Select, Space } from "antd"
import { ProductListResponseDataItem } from "../../../services/product"
import useCSelectProductHooks from "./hooks"

export type CSelectProductParams = {
  products: ProductListResponseDataItem[]
  onChangeProduct?: (id: any) => void
  onSelectProduct?: (product: ProductListResponseDataItem) => void
  loading?: boolean
}

const CSelectProduct: React.FC<CSelectProductParams> = ({ products, onChangeProduct, onSelectProduct, loading = false }) => {
  const {
    productSelected, setProductSelected,
    selected, setSelected
  } = useCSelectProductHooks()

  const handleChangeProduct = (id: string) => {
    const product = products.find((product) => Number(id) === product.id)
    setProductSelected(product)
    setSelected(id)
    onChangeProduct && onChangeProduct(product)
  }

  const handleSelectProduct = () => {
    onSelectProduct && onSelectProduct(productSelected!)
    setSelected(null)
  }

  return (
    <Space.Compact>
      <Select
        showSearch
        placeholder={loading ? 'Carregando Produtos' : 'Escolha um produto'}
        loading={loading}
        disabled={loading}
        value={selected}
        style={{
          minWidth: '100%'
        }}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={products.map(({ id, attributes: { name } }) => (
          {
            value: id,
            label: name
          }
        ))}
        onChange={handleChangeProduct}
      />
      {
        onSelectProduct && (
          <Button disabled={loading || productSelected === undefined} onClick={() => handleSelectProduct()} type="primary">Inserir</Button>
        )
      }
    </Space.Compact>
  )
}

export default CSelectProduct