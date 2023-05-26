import { useEffect } from "react";
import CTemplatePage from "../../../components/CTemplatePage"
import { getProductByID } from "../../../services/product";
import { Link } from "react-router-dom";
import { Avatar, Button, Col, Descriptions, Divider, Image, Row, Skeleton } from "antd";
import currencyFilter from "../../../utils/currencyFilter";
import imageHandler from "../../../utils/imageHandler";
import { CoffeeOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import useProductViewPageHooks from "./hooks";

const ProductViewPage: React.FC = () => {
  const {
    id,
    productDataAttributes, setproductDataAttributes,
    loading, setLoading,
    error, setError
  } = useProductViewPageHooks()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { attributes } } = await getProductByID(id!, { 'populate[0]': 'photo' });
        setproductDataAttributes(attributes)
      } catch (err) {
        setError(err as AxiosError)
        console.log("err", err);
        throw err;
      }
      setLoading(false)
    }
    fetchData();
    // eslint-disable-next-line
  }, [])

  return (
    <CTemplatePage error={error}>
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
                          src={imageHandler(productDataAttributes.photo, 'thumbnail')}
                          preview={{
                            src: imageHandler(productDataAttributes.photo, 'large')
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