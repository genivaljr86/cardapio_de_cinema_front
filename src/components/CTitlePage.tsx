import { Divider } from "antd"
import Title from "antd/es/typography/Title"

export type CTitlePageParams = {
  title: string
}
const CTitlePage: React.FC<CTitlePageParams> = ({ title }) => (
  <>
    <Title style={{ marginTop: '6px' }} level={2}>
      {title}
    </Title>
    <Divider />
  </>
)
export default CTitlePage