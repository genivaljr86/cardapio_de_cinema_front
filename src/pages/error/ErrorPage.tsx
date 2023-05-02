import { Result } from "antd";
import { Link } from "react-router-dom";
import CTemplatePage from "../../components/CTemplatePage";

const ErrorPage: React.FC = () => (
  <CTemplatePage>
    <Result
      status="404"
      title="404"
      subTitle="Infelizmente a página que você quer acessar não existe"
      extra={<Link to={'app'}>Volte pra Home</Link>}
    />
  </CTemplatePage>
)

export default ErrorPage;