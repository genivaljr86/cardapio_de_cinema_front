import { Form } from "antd"
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useClientEditPageHooks = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | undefined>(undefined)
  const navigate = useNavigate();
  const { id } = useParams();

  return {
    id,
    form,
    navigate,
    loading,
    setLoading,
    error,
    setError
  }
}

export default useClientEditPageHooks