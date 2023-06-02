import { useState } from "react"
import { ClientResponseDataObject } from "../../../services/client"

const useCSelectClientHooks = () => {
  const [clientSelected, setClientSelected] = useState<ClientResponseDataObject>()
  const [selected, setSelected] = useState<any>()
  return {
    clientSelected, setClientSelected,
    selected, setSelected
  }
}

export default useCSelectClientHooks