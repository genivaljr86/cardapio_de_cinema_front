import { Form } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useProductEditPageHooks = () => {
  const [form] = Form.useForm();
  const [photoHandle, setPhotoHandle] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const navigate = useNavigate();
  const { id } = useParams();
  return {
    id,
    form,
    navigate,
    loading, setLoading,
    photoHandle, setPhotoHandle,
    error, setError
  }
}

export default useProductEditPageHooks