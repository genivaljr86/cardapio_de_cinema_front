import { Skeleton, notification } from "antd";
import { useEffect } from "react";
import { AxiosError } from "axios";
import useClientEditPageHooks from "./hooks";
import { Client, getClientByID, putClient } from "../../../services/client";
import CTemplatePage from "../../../components/CTemplatePage";
import ClientForm from "../../../components/forms/ClientForm";

const ClientEditPage: React.FC = () => {
  const {
    id,
    form,
    navigate,
    loading, setLoading,
    error, setError
  } = useClientEditPageHooks()

  async function fetchData() {
    setLoading(true);
    try {
      const { data: { attributes: { name, address, phone } } } = await getClientByID(id!);
      form.setFieldsValue({ name, address, phone })
    } catch (err) {
      setError(err as AxiosError)
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
    <CTemplatePage error={error}>
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