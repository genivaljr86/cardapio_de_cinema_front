import { useEffect, useState } from "react";
import CTemplatePage from "../../components/CTemplatePage"
import { ProductResponseDataObject, getProductByID } from "../../services/product";
import { Link, useParams } from "react-router-dom";
import { Avatar, Button, Col, Descriptions, Divider, Image, Row, Skeleton } from "antd";
import currencyFilter from "../../utils/currencyFilter";
import imageHandler, { ImageFormatTypes } from "../../utils/imageHandler";
import { CoffeeOutlined, UserOutlined } from "@ant-design/icons";

const formats = ImageFormatTypes

const ProductViewPage: React.FC = () => {
  const { id } = useParams();

  const [productDataAttributes, setproductDataAttributes] = useState({} as ProductResponseDataObject['attributes']);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { attributes } } = await getProductByID(id!, { 'populate[0]': 'photo' });
        setproductDataAttributes(attributes)
      } catch (err) {
        console.log("err", err);
        throw err;
      }
      setLoading(false)
    }
    fetchData();
    // eslint-disable-next-line
  }, [])

  return (
    <CTemplatePage>
      {
        loading ? (
          <Skeleton active />
        ) :
          (
            <>
              <Row gutter={16}>
                <Col span={4}>
                  {
                    productDataAttributes.photo?.data ?
                      (
                        <Image
                          src={imageHandler(productDataAttributes.photo, formats.thumbnail)}
                          preview={{
                            src: imageHandler(productDataAttributes.photo, formats.large)
                          }}
                        />
                      ) :
                      (
                        <Avatar shape="square" icon={<CoffeeOutlined />} size={200} style={{ width: '100%' }} />
                      )
                  }
                </Col>
                <Col span={20}>
                  <Descriptions title={'Dados Gerais'}>
                    <Descriptions.Item label={'Nome'}>{productDataAttributes.name}</Descriptions.Item>
                    <Descriptions.Item label={'Preço'}>
                      {currencyFilter(productDataAttributes.price)}
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions>
                    <Descriptions.Item label={'Descrição'}>{productDataAttributes.description}</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <Divider />
              <Link to={`../edit/${id}`}>
                <Button type="primary">Editar Produto</Button>
              </Link>
            </>
          )
      }
    </CTemplatePage>
  )
}

export const ProductViewPageRoute = {
  path: 'view/:id',
  element: <ProductViewPage />,
  handle: {
    label: 'Detalhes'
  }
};

export default ProductViewPage;