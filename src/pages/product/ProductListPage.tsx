import React, { useEffect, useState } from "react";
import { Button, Modal, Table, notification } from "antd";
import CTemplatePage from "../../components/CTemplatePage";
import { ProductResponseDataObject, deleteProducts, getProducts } from "../../services/product";
import { CoffeeOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import currencyFilter from "../../utils/currencyFilter";

const ProductsListPage: React.FC = () => {
  const [dataSource, setdataSource] = useState([]);
  const columns = [
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
                description: 'Não foi possivel criar agora, tente mais tarde'
              });
              reject(err);
            });
        })
      },
    });
  };


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <CTemplatePage>
        <Table dataSource={dataSource} columns={columns} />
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