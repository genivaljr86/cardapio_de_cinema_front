import { Form, notification } from "antd";
import CTemplatePage from "../../components/CTemplatePage";
import ProductForm from "../../components/forms/ProductForm";
import { useNavigate } from "react-router-dom";
import { postProducts } from "../../services/product";

const ProductCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const { data: { data: { id } } } = await postProducts(values);
      notification.success({
        message: 'Sucesso!',
        description: `Produto ${values.name} foi criado!`
      })
      navigate(`../view/${id}`);
    } catch (err) {
      notification.error({
        message: 'Erro!',
        description: 'Não foi possivel criar agora, tente mais tarde'
      })
    }
  }
  return (
    <>
      <CTemplatePage>
        <ProductForm form={form} onFinish={onFinish} />
      </CTemplatePage>
    </>
  )
}

export const ProductCreatePageRoute = {
  path: 'new',
  element: <ProductCreatePage />,
  handle: {
    label: 'Novo'
  }
}
export default ProductCreatePage;