import { useNavigate, useParams } from "react-router-dom";
import CTemplatePage from "../../components/CTemplatePage"
import { useEffect, useState } from "react";
import { ClientResponseDataObject, getClientByID } from "../../services/client";
import { Button, Descriptions, Skeleton } from "antd";

const ClientViewPage: React.FC = () => {

  const { id } = useParams();
  const [clientData, setclientData] = useState({} as ClientResponseDataObject);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data: dataResponse } } = await getClientByID(id!);
        setclientData(dataResponse)
      } catch (err) {
        console.log("err", err);
        throw err;
      }
      setLoading(false)
    }
    fetchData();
    // eslint-disable-next-line
  }, [])
  return <>
    <CTemplatePage>
      {
        loading ? (
          <Skeleton active />
        )
          : (
            <>
              <Descriptions title={'Dados Pessoais'}>
                <Descriptions.Item label={'Nome'}>{clientData.attributes?.name}</Descriptions.Item>
                <Descriptions.Item label={'Endereço'}>{clientData.attributes?.address}</Descriptions.Item>
              </Descriptions>
              {/* 
                @todo Review url link
              */}
              <Button onClick={() => navigate(`../edit/${id}`)} type="primary">Editar Cliente</Button>
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