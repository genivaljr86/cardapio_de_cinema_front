import { useEffect, useState } from "react";
import CTemplatePage from "../../components/CTemplatePage"
import { ProductResponseDataObject, getProductByID } from "../../services/product";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Descriptions, Skeleton } from "antd";
import currencyFilter from "../../utils/currencyFilter";

const ProductViewPage: React.FC = () => {
  const { id } = useParams();

  const [productDataAttributes, setproductDataAttributes] = useState({} as ProductResponseDataObject['attributes']);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data: { attributes } } } = await getProductByID(id!);
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
              {/* 
                @todo Review url link
              */}
              <Button onClick={() => navigate(`../edit/${id}`)} type="primary">Editar Produto</Button>
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