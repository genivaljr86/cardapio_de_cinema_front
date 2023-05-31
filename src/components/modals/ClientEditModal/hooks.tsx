import { Form } from "antd"
import { useState } from "react";

const useClientEditModalHooks = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  return {
    form,
    openModal, setOpenModal,
    loading, setLoading
  }
}

export default useClientEditModalHooks