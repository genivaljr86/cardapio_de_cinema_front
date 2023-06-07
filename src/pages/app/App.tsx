import React, { useState } from 'react';
import { App as AntDApp, ConfigProvider, Layout, theme } from 'antd';
import CSidebarMenu from '../../components/CSidebarMenu';
import { Outlet } from 'react-router-dom';
import logo from '../../resources/img/logo.jpg'
import { HelmetProvider } from 'react-helmet-async';
import CThemeButton from '../../components/CThemeButton';
import CThemeContext from '../../components/contexts/CThemeContext';
import locale from 'antd/locale/pt_BR'


const { Header, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [cTheme, setCTheme] = useState('dark')
  const value = { cTheme, setCTheme }
  const themes: { [id: string]: any } = {
    dark: theme.darkAlgorithm,
    default: theme.defaultAlgorithm
  }

  return (
    <>
      <HelmetProvider>
        <CThemeContext.Provider value={value}>
          <ConfigProvider locale={locale} theme={{
            algorithm: themes[cTheme],
            token: {
              borderRadius: 0
            }
          }}>
            <AntDApp>
              <Layout>
                <Header className="header">
                  <img src={logo} alt="Logo do Cardápio de Cinema" width={60} />
                  {/* <Menu theme="dark" mode="horizontal" /> */}
                </Header>
                <Layout>
                  <Sider width={200} style={{ background: colorBgContainer }}>
                    <CSidebarMenu />
                  </Sider>
                  <Layout style={{ padding: '0 24px 24px' }}>
                    <Outlet />
                  </Layout>
                </Layout>
              </Layout>
              <CThemeButton />
            </AntDApp>
          </ConfigProvider>
        </CThemeContext.Provider>
      </HelmetProvider>
    </>
  );
};

export const AppPageRoute = {
  path: '/app',
  element: <App />
}
export default App;