import { Button, Divider, Form, FormInstance, Input, Space } from "antd";
const ClientForm: React.FC<{ form: FormInstance, onFinish: ((values: any) => void) }> = ({ form, onFinish }) => {
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      layout="vertical"
      autoComplete="off"
      form={form}
      requiredMark={true}
      onFinish={onFinish}
      style={
        {
          margin: '8px auto auto',
          maxWidth: '600px'
        }
      } >
      <Form.Item name="name" label="Nome"
        rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
        <Input placeholder="Insira o nome completo" />
      </Form.Item>
      <Form.Item name="address" label="Endereço"
        rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
        <Input placeholder="Insira o endereço completo" />
      </Form.Item>
      <Form.Item name="phone" label="Telefone"
        rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
        <Input placeholder="Insira o telefone" />
      </Form.Item>
      <Divider />
      <Form.Item >
        <Space size="small">
          <Button type="primary" htmlType="submit">Salvar</Button>
          <Button htmlType="button" type="link" onClick={onReset}>
            Limpar
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default ClientForm;