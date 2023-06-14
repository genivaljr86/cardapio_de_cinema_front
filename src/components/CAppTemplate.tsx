import { Layout, theme } from "antd"
import { Header } from "antd/es/layout/layout"
import logo from '../resources/img/logo.jpg'
import styled from "styled-components"
import Sider from "antd/es/layout/Sider"
import CSidebarMenu from "./CSidebarMenu"
import { Outlet } from "react-router-dom"

const CenterSider = styled(Sider)`
  .ant-layout-sider-children {
    display: flex;
    align-items: center;
    justify-content: center;
    ul {
      height: auto !important;
    }
  }
`

const CAppTemplate: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      {/* <Header className="header">
        <img src={logo} alt="Logo do Cardápio de Cinema" width={60} />
      </Header> */}
      <Layout>
        <CenterSider
          collapsible
          defaultCollapsed
          collapsedWidth={90}
          width={200}
          style={{ background: colorBgContainer }}
        >
          <CSidebarMenu />
        </CenterSider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Outlet />
        </Layout>
      </ Layout>
    </Layout >
  )
}

export default CAppTemplate