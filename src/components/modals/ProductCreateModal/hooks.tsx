import { Form } from "antd"
import { useState } from "react";
import CNotification from "../../feedback/notification";

const useProductCreateModalHooks = () => {
  const [form] = Form.useForm()
  const [photoHandle, setPhotoHandle] = useState({})
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const notification = CNotification()

  return {
    form,
    openModal, setOpenModal,
    photoHandle, setPhotoHandle,
    loading, setLoading,
    notification
  }
}

export default useProductCreateModalHooks