import { Button, Modal, Tooltip, notification } from "antd";
import { useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import useProductEditModalHooks from "./hooks";
import ProductForm from "../../forms/ProductForm";
import { isEmpty } from "lodash";
import { postFile } from "../../../services/file";
import { putProducts } from "../../../services/product";

export interface ProductModalParams {
  id: string
  photo: any
  productData: any
  onCancel?: Function
  onSuccess?: Function
}

const ProductEditModal = ({ id, photo, productData, onSuccess, onCancel }: ProductModalParams) => {
  const {
    form,
    loading, setLoading,
    openModal, setOpenModal
  } = useProductEditModalHooks()

  useEffect(() => {
    const { name, price, description } = productData
    form.setFieldsValue({ name, price, description })
    //eslint-disable-next-line
  }, [productData])


  const onFinish = async (values: any) => {
    setLoading(true)
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
      setOpenModal(false)
      onSuccess && onSuccess()
    } catch (err) {
      notification.error({
        message: 'Erro!',
        description: 'Não foi possivel editar agora, tente mais tarde.'
      })
    }
    setLoading(false)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    onCancel && onCancel()
    setOpenModal(false)
  };

  return (
    <>
      <Tooltip title={'Editar Produto'} color={'blue'}>
        <Button onClick={() => setOpenModal(true)} type={"link"}>
          <EditOutlined />
        </Button>
      </Tooltip>
      <Modal
        title={<><EditOutlined /> Editar Produto</>}
        open={openModal}
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <ProductForm photo={photo} form={form} onFinish={onFinish} hiddenButtons={true} />
      </Modal>
    </>

  )
}

export default ProductEditModal;