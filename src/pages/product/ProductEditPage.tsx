import { Form, Skeleton, notification } from "antd";
import CTemplatePage from "../../components/CTemplatePage";
import ProductForm from "../../components/forms/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByID, putProducts } from "../../services/product";
import { useEffect, useState } from "react";

const ProductEditPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();


  async function fetchData() {
    setLoading(true);
    try {
      const { data: { data: { attributes: { name, price } } } } = await getProductByID(id!);
      form.setFieldsValue({ name, price })
    } catch (err) {
      throw err;
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [])

  const onFinish = async (values: any) => {
    try {
      await putProducts(id!, values);
      notification.success({
        message: 'Sucesso!',
        description: `Produto ${values.name} foi editado!`
      })
      navigate(`../view/${id}`);
    } catch (err) {
      notification.error({
        message: 'Erro!',
        description: 'Não foi possivel editar agora, tente mais tarde.'
      })
    }
  }
  return (
    <>
      <CTemplatePage>
        {
          loading ? (
            <Skeleton />
          ) : (
            <ProductForm form={form} onFinish={onFinish} />
          )
        }
      </CTemplatePage>
    </>
  )
}

export const ProductEditPageRoute = {
  path: 'edit/:id',
  element: <ProductEditPage />,
  handle: {
    label: 'Editar'
  }
}
export default ProductEditPage;