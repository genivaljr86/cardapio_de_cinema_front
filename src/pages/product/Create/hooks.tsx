import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import CNotification from "../../../components/feedback/notification";

const useProductCreatePageHooks = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const notification = CNotification();
  return {
    form,
    navigate,
    notification
  }
}

export default useProductCreatePageHooks