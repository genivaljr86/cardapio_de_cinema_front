import CTemplatePage from "../../../components/CTemplatePage";
import CTable from "../../../components/tables/CTable";
import ClientCreateModal from "../../../components/modals/ClientCreateModal";
import useClientListPageHooks from "./hooks";
import { ClientResponseDataObject, deleteClient, getClients } from "../../../services/client";
import { Button } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

const columns: ColumnsType<any> = [
  {
    title: 'Nome',
    dataIndex: 'name'
  },
  {
    title: 'Endereço',
    dataIndex: 'address'
  }
];

const ClientListPage: React.FC = () => {
  const {
    dataSource, setDataSource,
    loading, setLoading,
    totalRecords, setTotalRecords,
    error, setError
  } = useClientListPageHooks()


  async function fetchData(filters: any = {}) {
    setLoading(true);
    try {
      const params = filters
      const { data: { data: dataResponse, meta: { pagination } } } = await getClients(params);
      const dataList = dataResponse.map((row: ClientResponseDataObject) => {
        const { id, attributes: { name, address } } = row;
        return {
          key: id,
          name: <Link to={`view/${id}`}>{name}</Link>,
          address
        }
      });

      setDataSource(dataList);
      setTotalRecords(pagination.total);

    } catch (err) {
      setError(err as AxiosError)
    }
    setLoading(false);
  }

  const onDelete = (id: number) => deleteClient(id!)

  return (
    <>
      <CTemplatePage title='Clientes' error={error}>
        <CTable
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          totalRecords={totalRecords}
          onChangeTable={fetchData}
          onDelete={onDelete}
          footerActions={(updateTable) => (
            <ClientCreateModal onSuccess={updateTable}>
              <Button type="primary" icon={<UsergroupAddOutlined />}>Criar Cliente</Button>
            </ClientCreateModal>
          )}
        />
      </CTemplatePage>
    </>
  )
}

export const ClientListPageRoute = {
  index: true,
  element: <ClientListPage />,
  handle: {
    label: 'Lista'
  }
};

export default ClientListPage;