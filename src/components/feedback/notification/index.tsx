import { App } from "antd"

const CNotification = () => {
  const { notification } = App.useApp()
  return notification
}

export default CNotification