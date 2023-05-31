import { Form } from "antd"
import { useState } from "react";

const useProductEditModalHooks = () => {
  const [form] = Form.useForm()
  const [photoHandle, setPhotoHandle] = useState({})
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  return {
    form,
    openModal, setOpenModal,
    photoHandle, setPhotoHandle,
    loading, setLoading
  }
}

export default useProductEditModalHooks