import { useState } from "react"
import modal from "../../../components/feedback/modal"

const UserListPageHooks = () => {
  const [dataSource, setDataSource] = useState([])
  const Modal = modal()
  return {
    dataSource, setDataSource,
    Modal
  }
}

export default UserListPageHooks