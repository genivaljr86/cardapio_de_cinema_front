import { Avatar, Space } from "antd"

export interface CProductLabelParams {
  photo: string
  name: string
}

const CProductLabel: React.FC<CProductLabelParams> = ({ photo, name }) => {
  return (
    <Space size={16}>
      <Avatar src={photo} size={'default'} />
      {name}
    </Space>
  )
}

export default CProductLabel