import { Form } from "antd"
import { useNavigate } from "react-router-dom";

const useClientCreateHooks = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate();

  return {
    form,
    navigate,
  }
}

export default useClientCreateHooks