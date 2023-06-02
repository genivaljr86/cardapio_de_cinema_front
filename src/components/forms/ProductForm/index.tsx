import { Button, Divider, Form, FormInstance, Input, Space } from "antd"
import TextArea from "antd/es/input/TextArea";
import { NumericFormat } from "react-number-format";
import CUploadImage from "../../inputs/CUploadImage";


const ProductForm: React.FC<{ form: FormInstance, onFinish: ((values: any) => void), photo?: any, hiddenButtons?: boolean }> = ({ form, onFinish, photo, hiddenButtons }) => {
  const onReset = () => {
    form.resetFields();
  };

  const onChangeImage = (fileImage: any) => {
    form.setFieldValue("photo", fileImage)
  }

  return (
    <>
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
        }>
        <CUploadImage photo={photo} onChangeImage={onChangeImage} />
        <Form.Item
          name='photo'
          hidden
        >
        </Form.Item>

        <Form.Item name="name" label="Nome"
          rules={[{ required: true, message: 'Esse campo é obrigatório' }]}
        >
          <Input placeholder="Insira o nome completo" />
        </Form.Item>
        <Form.Item name="price" label="Preço"
          rules={[
            { required: true, message: 'Esse campo é obrigatório' },
            // @todo Create min value validation
            // { min: 0.01, message: 'O valor mínimo é de R$ 0.01' }
          ]}
        >
          <NumericFormat
            decimalScale={2}
            fixedDecimalScale
            customInput={Input}
            addonBefore={'R$'}
          />
        </Form.Item>
        <Form.Item name="description" label="Descrição">
          <TextArea rows={5} />
        </Form.Item>

        <Divider />
        {
          !hiddenButtons && (
            <Form.Item>
              <Space size="small">
                <Button type="primary" htmlType="submit">Salvar</Button>
                <Button htmlType="button" type="link" onClick={onReset}>
                  Limpar
                </Button>
              </Space>
            </Form.Item>

          )
        }
      </Form>
    </>
  );
}

export default ProductForm