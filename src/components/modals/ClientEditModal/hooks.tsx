import { Form } from "antd"
import { useState } from "react";
import CNotification from "../../feedback/notification";

const useClientEditModalHooks = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const notification = CNotification()


  return {
    form,
    openModal, setOpenModal,
    loading, setLoading,
    notification
  }
}

export default useClientEditModalHooks