import { Button } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";
import { ColumnsType } from 'antd/lib/table'
import CTemplatePage from "../../../components/CTemplatePage";
import { ProductResponseDataObject, deleteProducts, getProducts } from "../../../services/product";
import { Link } from "react-router-dom";
import currencyFilter from "../../../utils/currencyFilter";
import ProductCreateModal from "../../../components/modals/ProductCreateModal";
import useProductListPageHooks from "./hooks";
import imageHandler from "../../../utils/imageHandler";
import CProductLabel from "../../../components/CProductLabel";
import CTable from "../../../components/tables/CTable";

const columns: ColumnsType<any> = [
  {
    title: 'Nome',
    dataIndex: 'name'
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    render: currencyFilter
  },
  {
    title: '',
    align: 'right',
    dataIndex: 'actions'
  }
]

const ProductsListPage: React.FC = () => {
  const {
    dataSource, setdataSource,
    loading, setLoading,
    totalRecords, setTotalRecords
  } = useProductListPageHooks()

  const fetchData = async (filters: any = {}) => {
    setLoading(true)
    try {
      const params = {
        ...filters,
        'populate[0]': 'photo'
      }
      const { data: { data: dataResponse, meta: { pagination } } } = await getProducts(params);
      const dataList = dataResponse.map((row: ProductResponseDataObject) => {
        const { id, attributes: { name, price, photo } } = row
        return {
          key: id,
          name:
            <Link to={`view/${id}`}>
              <CProductLabel photo={photo?.data ? imageHandler(photo, 'thumbnail') : undefined} name={name} />
            </Link>,
          price
        }
      });
      setdataSource(dataList);
      setTotalRecords(pagination.total);

    } catch (err) {
      throw err;
    }
    setLoading(false)
  }

  const handleDeleteRequest = (id: number) => deleteProducts(id!)

  return (
    <>
      <CTemplatePage title="Produtos">
        <CTable
          loading={loading}
          dataSource={dataSource}
          totalRecords={totalRecords}
          onChangeTable={fetchData}
          onDelete={handleDeleteRequest}
          columns={columns} />
        <ProductCreateModal onSuccess={fetchData}>
          <Button type="primary" icon={<CoffeeOutlined />}>Criar Produto</Button>
        </ProductCreateModal>
      </CTemplatePage>
    </>
  )
}

export const ProductListRoute = {
  index: true,
  element: <ProductsListPage />,
  handle: {
    label: 'Lista'
  }
};

export default ProductsListPage;