import { Layout, theme } from "antd"
import { Header } from "antd/es/layout/layout"
import logo from '../resources/img/logo.jpg'
import styled from "styled-components"
import Sider from "antd/es/layout/Sider"
import CSidebarMenu from "./CSidebarMenu"
import { Outlet } from "react-router-dom"

const CSidebarMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 72px);
  ul {
    height: auto !important;
  }
`

const CAppTemplate: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        collapsible
        defaultCollapsed
        collapsedWidth={90}
        width={200}
        trigger={null}
        style={
          {
            background: colorBgContainer,
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }
        }
      >
        <Header style={{ paddingInline: '14px', paddingTop: '10px', }}>
          <img src={logo} alt="Logo do Cardápio de Cinema" width={60} style={{ borderRadius: '360px', border: '2px solid #dc4446' }} />
        </Header>
        <CSidebarMenuWrapper>
          <CSidebarMenu />
        </CSidebarMenuWrapper>
      </Sider>
      <Layout style={
        {
          padding: '0 24px 24px',
          marginLeft: 100
        }
      }
      >
        <Outlet />
      </Layout>
    </Layout >
  )
}

export default CAppTemplate