import React, { useState } from 'react';
import { App as AntDApp, ConfigProvider, theme } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import CThemeButton from '../../components/CThemeButton';
import CThemeContext from '../../components/contexts/CThemeContext';
import locale from 'antd/locale/pt_BR'
import CAppTemplate from '../../components/CAppTemplate';

const App: React.FC = () => {

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
              <CAppTemplate />
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