import { Button, Select, Space } from "antd"
import { OptionProps } from "antd/es/select"

export type CSelectProductParams = {
  productListOptions: OptionProps[]
  handleChangeProduct?: (id: any) => void
  handleSelectProduct?: () => void
  loading?: boolean
}

const CSelectProduct: React.FC<CSelectProductParams> = ({ productListOptions, handleChangeProduct, handleSelectProduct, loading = false }) => {
  return (
    <Space.Compact>
      <Select
        disabled={loading}
        showSearch
        placeholder={loading ? 'Carregando Produtos' : 'Escolha um produto'}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        loading={loading}
        options={productListOptions}
        onChange={handleChangeProduct}
      />
      {
        handleSelectProduct && (
          <Button disabled={loading} onClick={() => handleSelectProduct()} type="default">Inserir</Button>
        )
      }
    </Space.Compact>
  )
}

export default CSelectProduct