import { useEffect } from "react";
import { Avatar, Button, Space, Table, TablePaginationConfig, notification } from "antd";
import { CoffeeOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { ColumnsType } from 'antd/lib/table'
import CTemplatePage from "../../../components/CTemplatePage";
import { ProductResponseDataObject, deleteProducts, getProducts } from "../../../services/product";
import { Link } from "react-router-dom";
import currencyFilter from "../../../utils/currencyFilter";
import ProductCreateModal from "../../../components/modals/ProductCreateModal";
import useProductListPageHooks from "./hooks";
import imageHandler from "../../../utils/imageHandler";

const ProductsListPage: React.FC = () => {
  const {
    dataSource, setdataSource,
    loading, setLoading,
    tableParams, setTableParams,
    Modal
  } = useProductListPageHooks()

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
  ];

  const fetchData = async () => {
    try {
      const params = {
        'pagination[page]': tableParams.pagination?.current,
        'pagination[pageSize]': tableParams.pagination?.pageSize,
        'populate[0]': 'photo'
      }
      const { data: { data: dataResponse, meta: { pagination } } } = await getProducts(params);
      const dataList = dataResponse.map((row: ProductResponseDataObject) => {
        const { id, attributes: { name, price, photo } } = row;
        return {
          key: id,
          name: <Space size={16}>
            <Avatar src={imageHandler(photo, 'thumbnail')} size={'default'} />
            <Link to={`view/${id}`}>{name}</Link>
          </Space>,
          price,
          actions: <Button type="link" onClick={() => showDeleteConfirm(id!)}>Apagar</Button>
        }
      });
      setdataSource(dataList);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: pagination.total
        },
      });

    } catch (err) {
      throw err;
    }

    setLoading(false);
  }
  const handleTableChange = (
    pagination: TablePaginationConfig
  ) => {
    setTableParams({ pagination })
  }

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: 'Tem certeza que desejar apagar?',
      icon: <ExclamationCircleFilled />,
      content: 'Essa ação é irreversivel.',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk() {
        return new Promise((resolve, reject) => {
          deleteProducts(id!)
            .then(response => {
              notification.success({
                message: 'Sucesso!',
                description: 'Produto apagado com sucesso'
              })
              fetchData();
              resolve(response);
            })
            .catch(err => {
              notification.error({
                message: 'Erro!',
                description: 'Não foi possivel apagar agora, tente mais tarde'
              });
              reject(err);
            });
        })
      },
    });
  };

  /**
   * @todo Avoid initial double request by tableParams changes
   */
  useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line
  }, [JSON.stringify(tableParams)])

  return (
    <>
      <CTemplatePage>
        <Table
          loading={loading}
          dataSource={dataSource}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
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