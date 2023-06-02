import { Button, Modal, Tooltip } from "antd";
import { useEffect } from "react";
import useClientEditModalHooks from "./hooks";
import { Client, putClient } from "../../../services/client";
import ClientForm from "../../forms/ClientForm";
import { EditOutlined } from "@ant-design/icons";

export interface ClientModalParams {
  id: string;
  clientData: any;
  onCancel?: Function;
  onSuccess?: Function;
}

const ClientEditModal = ({ id, clientData, onSuccess, onCancel }: ClientModalParams) => {
  const {
    form,
    loading, setLoading,
    openModal, setOpenModal,
    notification
  } = useClientEditModalHooks()

  useEffect(() => {
    const { name, address, phone } = clientData;
    form.setFieldsValue({ name, address, phone })
    //eslint-disable-next-line
  }, [clientData, openModal])

  const onFinish = async (values: Client) => {
    setLoading(true);
    try {
      await putClient(id!, values);
      notification.success({
        message: 'Sucesso!',
        description: `Cliente ${values.name} foi editado!`
      })
      onSuccess && onSuccess()
      setOpenModal(false)
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
      <Tooltip title={'Editar Cliente'} color={'blue'}>
        <Button onClick={() => setOpenModal(true)} type={"link"}>
          <EditOutlined />
        </Button>
      </Tooltip>
      <Modal
        forceRender
        title={<><EditOutlined /> Editar Cliente</>}
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

export default ClientEditModal;