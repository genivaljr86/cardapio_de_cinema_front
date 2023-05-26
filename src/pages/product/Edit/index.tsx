import { Skeleton, notification } from "antd";
import CTemplatePage from "../../../components/CTemplatePage";
import ProductForm from "../../../components/forms/ProductForm";
import { getProductByID, putProducts } from "../../../services/product";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { isEmpty } from "lodash";
import { postFile } from "../../../services/file";
import useProductEditPageHooks from "./hooks";

const ProductEditPage: React.FC = () => {
  const {
    id,
    form,
    navigate,
    loading, setLoading,
    photoHandle, setPhotoHandle,
    error, setError
  } = useProductEditPageHooks()


  async function fetchData() {
    setLoading(true);
    try {
      const { data: { attributes: { name, price, photo } } } = await getProductByID(id!, { 'populate[0]': 'photo' });
      setPhotoHandle(photo)
      form.setFieldsValue({ name, price })
    } catch (err) {
      setError(err as AxiosError)
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [])

  const onFinish = async (values: any) => {
    const valuesHandled = values

    try {
      if (!isEmpty(values.photo)) {
        const formData = new FormData();
        formData.append('files', valuesHandled?.photo[0].originFileObj)
        const response = await postFile(formData)
        valuesHandled.photo = response.data[0].id
      }
      await putProducts(id!, valuesHandled);
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
      <CTemplatePage error={error}>
        {
          loading ? (
            <Skeleton />
          ) : (
            <ProductForm form={form} onFinish={onFinish} photo={photoHandle} />
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