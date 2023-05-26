import { Form } from "antd";
import { useNavigate } from "react-router-dom";

const useProductCreateHooks = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  return {
    form,
    navigate,
  }
}

export default useProductCreateHooks