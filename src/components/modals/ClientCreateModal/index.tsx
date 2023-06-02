import { Button, Modal, Tooltip } from "antd";
import { useEffect } from "react";
import { Client, postClients, putClient } from "../../../services/client";
import ClientForm from "../../forms/ClientForm";
import { EditOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import useClientCreateModalHooks from "./hooks";

export interface ClientModalParams {
  onCancel?: Function;
  onSuccess?: Function;
  children: React.ReactNode
}

const ClientCreateModal = ({ onSuccess, onCancel, children }: ClientModalParams) => {
  const {
    form,
    loading, setLoading,
    openModal, setOpenModal,
    notification
  } = useClientCreateModalHooks()

  useEffect(() => {
    form.resetFields()
    //eslint-disable-next-line
  }, [openModal])

  const onFinish = async (values: Client) => {
    setLoading(true);
    try {
      await postClients(values);
      notification.success({
        message: 'Sucesso!',
        description: `Cliente ${values.name} foi criado!`
      })
      onSuccess && onSuccess()
      setOpenModal(false)
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
        title={<><UsergroupAddOutlined /> Criar Cliente</>}
        open={openModal}
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ClientForm form={form} onFinish={onFinish} hiddenButtons={true} />
      </Modal>
    </>

  )
}

export default ClientCreateModal;