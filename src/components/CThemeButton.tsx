import { BulbOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { useContext } from "react"
import CThemeContext from "./contexts/CThemeContext"

const CThemeButton: React.FC = () => {
  const { cTheme, setCTheme } = useContext(CThemeContext)
  return (
    <FloatButton
      icon={<BulbOutlined />}
      tooltip={<div>Modo Noturno</div>}
      onClick={() => setCTheme(cTheme === 'default' ? 'dark' : 'default')}
    />

  )
}

export default CThemeButton