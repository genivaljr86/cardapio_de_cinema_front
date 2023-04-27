import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import CBreadcrumb from "../../components/CBreadBrumb";

const ClientCreatePage: React.FC = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (<>
    <CBreadcrumb />
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: colorBgContainer,
      }}
    >
      <h1>Novo Cliente</h1>
    </Content>
  </>)
}

export const ClientCreatePageRoute = {
  path: 'new',
  element: <ClientCreatePage />,
  handle: {
    label: 'Novo'
  }
}
export default ClientCreatePage;