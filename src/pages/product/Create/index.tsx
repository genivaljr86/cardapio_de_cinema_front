import { notification } from "antd";
import CTemplatePage from "../../../components/CTemplatePage";
import ProductForm from "../../../components/forms/ProductForm";
import { postProducts } from "../../../services/product";
import { postFile } from "../../../services/file";
import { isEmpty } from "lodash";
import useProductCreateHooks from "./hooks";

const ProductCreatePage: React.FC = () => {
  const {
    form,
    navigate
  } = useProductCreateHooks()

  const onFinish = async (values: any) => {
    const valuesHandled = values

    try {
      if (!isEmpty(values.photo)) {
        const formData = new FormData();
        formData.append('files', valuesHandled?.photo[0].originFileObj)
        const response = await postFile(formData)
        valuesHandled.photo = response.data[0].id
      }
      const { data: { id } } = await postProducts(values);
      notification.success({
        message: 'Sucesso!',
        description: `Produto ${values.name} foi criado!`
      })
      navigate(`../view/${id}`);
    } catch (err) {
      console.log("error", err);
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