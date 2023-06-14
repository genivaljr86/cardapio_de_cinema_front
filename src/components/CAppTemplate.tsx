import { Layout, theme } from "antd"
import { Header } from "antd/es/layout/layout"
import logo from '../resources/img/logo.jpg'
import styled from "styled-components"
import Sider from "antd/es/layout/Sider"
import CSidebarMenu from "./CSidebarMenu"
import { Outlet } from "react-router-dom"

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  ul {
    height: auto !important;
  }
`

const CAppTemplate: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Layout>
        <Sider
          collapsible
          defaultCollapsed
          collapsedWidth={90}
          width={200}
          trigger={null}
          style={{ background: colorBgContainer }}
        >
          <Header style={{ paddingInline: '14px', paddingTop: '10px', }}>
            <img src={logo} alt="Logo do Cardápio de Cinema" width={60} style={{ borderRadius: '360px', border: '2px solid #dc4446' }} />
          </Header>
          <Center>
            <CSidebarMenu />
          </Center>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Outlet />
        </Layout>
      </ Layout>
    </Layout >
  )
}

export default CAppTemplate