import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, FormInstance, Input, InputNumber, Modal, Row, Space } from "antd"
import TextArea from "antd/es/input/TextArea";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { ReactElement, useState } from "react";

// const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });


const ProductForm: React.FC<{ form: FormInstance, onFinish: any, extraButtons?: ReactElement }> = ({ form, onFinish, extraButtons }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleCancel = () => setPreviewOpen(false)
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        requiredMark={true}
        onFinish={onFinish} >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name='photo'
              valuePropName='fileList'
              noStyle
              getValueFromEvent={(event) => {
                return event.fileList
              }}
            >
              <Upload
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess && onSuccess("ok")
                  }, 0);
                }}
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length > 0 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>

          </Col>
          <Col span={8}>
            <Form.Item name="name" label="Nome"
            // rules={[{ required: true, message: 'Esse campo é obrigatório' }]}
            >
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
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="description" label="Descrição">
              <TextArea rows={6} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space size="small">
            <Button type="primary" htmlType="submit">Salvar</Button>
            <Button htmlType="button" type="link" onClick={onReset}>
              Limpar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default ProductForm