import { Form, Skeleton, notification } from "antd";
import CTemplatePage from "../../components/CTemplatePage";
import { Client, getClientByID, putClient } from "../../services/client";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientForm from "../../components/forms/ClientForm";

const ClientEditPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchData() {
    setLoading(true);
    try {
      const { data: { attributes: { name, address, phone } } } = await getClientByID(id!);
      form.setFieldsValue({ name, address, phone })
    } catch (err) {
      throw err;
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [])

  const onFinish = async (values: Client) => {
    try {
      await putClient(id!, values);
      notification.success({
        message: 'Sucesso!',
        description: `Cliente ${values.name} foi editado!`
      })
      navigate(`../view/${id}`);
    } catch (err) {
      notification.error({
        message: 'Erro!',
        description: 'Não foi possivel editar agora, tente mais tarde.'
      })
    }
  }

  return (<>
    <CTemplatePage>
      {
        loading ? (
          <Skeleton />
        ) : (
          <ClientForm form={form} onFinish={onFinish} />
        )
      }
    </CTemplatePage>
  </>);
}

export const ClientEditPageRoute = {
  path: 'edit/:id',
  element: <ClientEditPage />,
  handle: {
    label: 'Editar'
  }
}
export default ClientEditPage;