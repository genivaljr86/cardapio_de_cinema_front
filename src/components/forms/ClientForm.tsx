import { Button, Form, FormInstance, Input, Space } from "antd";
/** @todo Review onFinish type */
const ClientForm: React.FC<{ form: FormInstance, onFinish: any }> = ({ form, onFinish }) => {
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
      style={{ maxWidth: 600 }} >
      <Form.Item name="name" label="Nome"
        rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
        <Input placeholder="Insira o nome completo" />
      </Form.Item>
      <Form.Item name="address" label="Endereço"
        rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
        <Input placeholder="Insira o endereço completo" />
      </Form.Item>
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