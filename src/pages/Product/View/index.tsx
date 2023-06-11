import { useEffect } from "react";
import CTemplatePage from "../../../components/CTemplatePage"
import { getProductByID } from "../../../services/product";
import { Avatar, Col, Descriptions, Divider, Image, Row, Skeleton } from "antd";
import currencyFilter from "../../../utils/currencyFilter";
import imageHandler from "../../../utils/imageHandler";
import { CoffeeOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import useProductViewPageHooks from "./hooks";
import ProductEditModal from "../../../components/modals/ProductEditModal";

const ProductViewPage: React.FC = () => {
  const {
    id,
    productDataAttributes, setproductDataAttributes,
    loading, setLoading,
    error, setError
  } = useProductViewPageHooks()

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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])

  return (
    <CTemplatePage title={`Produto #${id}`} error={error}>
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
                  <Descriptions title={
                    <>
                      Dados Gerais
                      <ProductEditModal productData={productDataAttributes} id={id!} photo={productDataAttributes.photo} onSuccess={fetchData} />
                    </>
                  }>
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