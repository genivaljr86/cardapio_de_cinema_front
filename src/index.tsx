import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import routes from './pages/routes';
import { ConfigProvider, theme } from 'antd';
import locale from 'antd/locale/pt_BR'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <ConfigProvider locale={locale} theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        borderRadius: 0
      }
    }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
