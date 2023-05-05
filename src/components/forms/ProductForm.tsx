import { Button, Form, FormInstance, Input, InputNumber, Space } from "antd"
import { ReactElement } from "react";

const ProductForm: React.FC<{ form: FormInstance, onFinish: any, extraButtons?: ReactElement }> = ({ form, onFinish, extraButtons }) => {
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
      <Form.Item name="price" label="Preço"
        initialValue={0}
        rules={[
          { required: true, message: 'Esse campo é obrigatório' },
          // @todo Create min value validation
          // { min: 0.01, message: 'O valor mínimo é de R$ 0.01' }
        ]}>
        <InputNumber
          addonBefore={'R$'}
          onKeyPress={(e) => !/^[0-9.]+$/.test(e.key) && e.preventDefault()}
          onChange={(value) => console.log('changed', value)}
        />
      </Form.Item>
      <Form.Item>
        <Space size="small">
          <Button type="primary" htmlType="submit">Salvar</Button>
          <Button htmlType="button" type="link" onClick={onReset}>
            Limpar
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default ProductForm