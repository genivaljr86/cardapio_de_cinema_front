import React, { useEffect, useState } from "react";
import { Button, Modal, Skeleton, Table, notification } from "antd";
import { CoffeeOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { ColumnsType } from 'antd/lib/table'
import CTemplatePage from "../../components/CTemplatePage";
import { ProductResponseDataObject, deleteProducts, getProducts } from "../../services/product";
import { Link } from "react-router-dom";
import currencyFilter from "../../utils/currencyFilter";

const ProductsListPage: React.FC = () => {
  const [dataSource, setdataSource] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const { data: { data: dataResponse } } = await getProducts();
      const dataList = dataResponse.map((row: ProductResponseDataObject) => {
        const { id, attributes: { name, price } } = row;
        return {
          key: id,
          name: <Link to={`view/${id}`}>{name}</Link>,
          price,
          actions: <Button type="link" onClick={() => showDeleteConfirm(id!)}>Apagar</Button>
        }
      });
      setdataSource(dataList)

    } catch (err) {
      throw err;
    }

    setLoading(false);
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


  useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <CTemplatePage>
        {
          loading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <Table
              // @todo Create pagination and loading in table 
              //loading={loading}
              dataSource={dataSource}
              columns={columns} />
          )
        }
        <Button type="primary" href={'./products/new'} icon={<CoffeeOutlined />} >Criar Produto</Button>
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