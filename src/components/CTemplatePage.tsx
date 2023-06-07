import { Divider, Layout, Result, theme } from "antd";
import CBreadcrumb from "./CBreadBrumb"
import { AxiosError } from "axios";
import { ResultStatusType } from "antd/es/result";
import { isEmpty } from "lodash";
import Title from "antd/es/typography/Title";
import { Helmet } from "react-helmet-async";
import CTitlePage from "./CTitlePage";

const { Content } = Layout;

interface Props {
  title?: string
  children: React.ReactNode;
  error?: AxiosError
}

const errorCodes = [403, 404, 500]

const errorMessages: { [key: number]: string } = {
  403: 'Desculpe, você não autorização para acessar essa página.',
  404: 'Desculpe, mas a página que você está buscando não existe.',
  500: 'Desculpe, houve algum erro.',
}

const CTemplatePage: React.FC<Props> = ({ error = {}, children, title }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const ResultError = (status: number) => {
    const code: number = errorCodes.includes(status) ? status : 500;

    return (
      <Result
        status={code as ResultStatusType}
        title={code}
        subTitle={errorMessages[code]}
      />
    )
  }

  return <>

    <Helmet>
      <title>{`${title || ''} | Cardápio de Cinema`}</title>
    </Helmet>
    <CBreadcrumb />
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 'calc(100vh - 140px)',
        background: colorBgContainer,
      }}
    >

      {
        isEmpty(error) ? (
          <>
            {title && <CTitlePage title={title} />}
            {children}
          </>
        ) : (
          ResultError(error?.response?.status!)
        )
      }
    </Content>
  </>
}

export default CTemplatePage;