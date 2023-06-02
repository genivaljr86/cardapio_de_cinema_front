import { Modal } from "antd";
import { useEffect } from "react";
import { CoffeeOutlined } from "@ant-design/icons";
import ProductForm from "../../forms/ProductForm";
import { isEmpty } from "lodash";
import { postFile } from "../../../services/file";
import { postProducts } from "../../../services/product";
import useProductCreateModalHooks from "./hooks";

export interface ProductModalParams {
  onCancel?: Function
  onSuccess?: Function
  children: React.ReactNode
}

const ProductCreateModal = ({ children, onSuccess, onCancel }: ProductModalParams) => {
  const {
    form,
    loading, setLoading,
    openModal, setOpenModal,
    notification
  } = useProductCreateModalHooks()

  useEffect(() => {
    form.resetFields()
    //eslint-disable-next-line
  }, [openModal])


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
      await postProducts(valuesHandled);
      notification.success({
        message: 'Sucesso!',
        description: `Produto ${values.name} foi criado!`
      })
      setOpenModal(false)
      onSuccess && onSuccess()
    } catch (err) {
      notification.error({
        message: 'Erro!',
        description: 'Não foi possivel criar agora, tente mais tarde.'
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
      <div onClick={() => setOpenModal(true)}>
        {children}
      </div>
      <Modal
        forceRender
        title={<><CoffeeOutlined /> Criar Produto</>}
        open={openModal}
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <ProductForm form={form} onFinish={onFinish} hiddenButtons={true} />
      </Modal>
    </>

  )
}

export default ProductCreateModal;