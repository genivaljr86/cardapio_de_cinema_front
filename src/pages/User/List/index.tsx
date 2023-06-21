import { RouteObject } from "react-router-dom";
import CTemplatePage from "../../../components/CTemplatePage";
import { Button, Table, notification } from "antd";
import { useEffect } from "react";
import { UsersDataItem, deleteUsers, getUsers, postUsers } from "../../../services/user";
import { ExclamationCircleFilled } from "@ant-design/icons";
import UserListPageHooks from "./hooks";
import { ColumnsType } from "antd/lib/table";

const columns: ColumnsType<any> = [
  {
    title: 'Nome',
    dataIndex: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: '',
    align: 'right',
    dataIndex: 'actions',
  }
]

const UserListPage: React.FC = () => {
  const {
    dataSource, setDataSource,
    Modal
  } = UserListPageHooks();
  const fetchdata = async () => {
    const { data: dataResponse } = await getUsers({ 'populate[0]': 'role' });
    const dataList = dataResponse.map((row: UsersDataItem) => {
      const { id, username, email } = row;
      return {
        key: id,
        username,
        email,
        actions: <Button type="link" onClick={() => showDeleteConfirm(id!)}>Apagar</Button>
      }
    })
    setDataSource(dataList)
  }
  useEffect(() => {
    fetchdata()
  }, [])

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: 'Deseja realmente apagar este registro?',
      content: 'Esta ação não poderá ser desfeita',
      icon: <ExclamationCircleFilled />,
      okText: 'Apagar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteUsers(id).then(() => {
          fetchdata()
        }).catch(() => {
          notification.error({
            message: 'Não foi possível apagar o registro'
          })
        })
      }
    })
  }

  const createUsers = async () => {
    const data = {
      username: "teste",
      email: "teste@mail.com",
      password: "123456",
      role: 3
    }
    const dataResponse = await postUsers(data);
    console.log("dataResponse", dataResponse);
    fetchdata()
  }
  return (
    <CTemplatePage title="Usuários">
      <Table
        dataSource={dataSource}
        columns={columns} />
      <Button type="primary" onClick={() => createUsers()}>Novo</Button>
    </CTemplatePage>
  )
}
export default UserListPage;
export const UserListPageRoute: RouteObject = {
  index: true,
  element: <UserListPage />,
  handle: {
    label: 'Lista'
  }
}

