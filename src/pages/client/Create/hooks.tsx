import { Form } from "antd"
import { useNavigate } from "react-router-dom";

const useClientCreatePageHooks = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate();

  return {
    form,
    navigate,
  }
}

export default useClientCreatePageHooks