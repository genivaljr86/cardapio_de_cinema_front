import { Link } from "react-router-dom";
import CTemplatePage from "../../../components/CTemplatePage"
import { useEffect } from "react";
import { getClientByID } from "../../../services/client";
import { Button, Descriptions, Skeleton } from "antd";
import { AxiosError } from "axios";
import useClientViewPageHooks from "./hooks";

const ClientViewPage: React.FC = () => {

  const {
    id,
    clientData, setclientData,
    loading, setLoading,
    error, setError
  } = useClientViewPageHooks()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: dataResponse } = await getClientByID(id!);
        setclientData(dataResponse)
      } catch (err) {
        setError(err as AxiosError)
      }
      setLoading(false)
    }
    fetchData();
    // eslint-disable-next-line
  }, [])
  return <>
    <CTemplatePage error={error}>
      {
        loading ? (
          <Skeleton active />
        )
          : (
            <>
              <Descriptions title={'Dados Pessoais'}>
                <Descriptions.Item label={'Nome'}>{clientData.attributes?.name}</Descriptions.Item>
                <Descriptions.Item label={'Endereço'}>{clientData.attributes?.address}</Descriptions.Item>
                <Descriptions.Item label={'Telefone'}>{clientData.attributes?.phone}</Descriptions.Item>
              </Descriptions>
              <Link to={`../edit/${id}`}>
                <Button type="primary">Editar Cliente</Button>
              </Link>
            </>
          )
      }
    </CTemplatePage>
  </>
}

export const ClientViewPageRoute = {
  path: 'view/:id',
  element: <ClientViewPage />,
  handle: {
    label: 'Detalhes'
  }
};

export default ClientViewPage