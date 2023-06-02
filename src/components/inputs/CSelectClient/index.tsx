import { Button, Select, Space } from "antd"
import { ClientResponseDataObject } from "../../../services/client"
import useCSelectClientHooks from "./hooks"

export type CSelectClientParams = {
  clients: ClientResponseDataObject[]
  onChangeClient?: (id: any) => void
  onSelectClient?: (client: ClientResponseDataObject) => void
  loading?: boolean
}

const CSelectClient: React.FC<CSelectClientParams> = ({ clients, onChangeClient, onSelectClient, loading = false }) => {
  const {
    clientSelected, setClientSelected,
    selected, setSelected
  } = useCSelectClientHooks()

  const handleChangeClient = (id: string) => {
    const client = clients.find((client) => Number(id) === client.id)
    setClientSelected(client)
    setSelected(id)
    onChangeClient && onChangeClient(client)
  }

  const handleSelectClient = () => {
    onSelectClient && onSelectClient(clientSelected!)
    setSelected(null)
  }

  return (
    <Space.Compact>
      <Select
        showSearch
        placeholder={loading ? 'Carregando Clientes' : 'Escolha um cliente'}
        loading={loading}
        disabled={loading}
        value={selected}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={clients.map(({ id, attributes: { name } }) => (
          {
            value: id,
            label: name
          }
        ))}
        onChange={handleChangeClient} />
      {
        onSelectClient && (
          <Button
            type="default"
            disabled={loading || clientSelected == null}
            onClick={() => handleSelectClient()}>
            Selecionar
          </Button>
        )
      }
    </Space.Compact>
  )
}

export default CSelectClient