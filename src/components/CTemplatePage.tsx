import { Layout, theme } from "antd";
import CBreadcrumb from "./CBreadBrumb"

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const CTemplatePage: React.FC<Props> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return <>
    <CBreadcrumb />
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: colorBgContainer,
      }}
    >
      {children}
    </Content>
  </>
}

export default CTemplatePage;