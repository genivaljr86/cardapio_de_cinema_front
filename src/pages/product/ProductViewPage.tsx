import { useEffect, useState } from "react";
import CTemplatePage from "../../components/CTemplatePage"
import { ProductResponseDataObject, getProductByID } from "../../services/product";
import { Link, useParams } from "react-router-dom";
import { Button, Descriptions, Skeleton } from "antd";
import currencyFilter from "../../utils/currencyFilter";

const ProductViewPage: React.FC = () => {
  const { id } = useParams();

  const [productDataAttributes, setproductDataAttributes] = useState({} as ProductResponseDataObject['attributes']);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { attributes } } = await getProductByID(id!);
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
              <Descriptions title={'Dados Gerais'}>
                <Descriptions.Item label={'Nome'}>{productDataAttributes.name}</Descriptions.Item>
                <Descriptions.Item label={'Preço'}>
                  {currencyFilter(productDataAttributes.price)}
                </Descriptions.Item>
              </Descriptions>
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