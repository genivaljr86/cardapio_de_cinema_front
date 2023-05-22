import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, FormInstance, Input, InputNumber, Modal, Row, Space } from "antd"
import TextArea from "antd/es/input/TextArea";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { useEffect, useState } from "react";
import imageHandler from "../../utils/imageHandler";
import styled from "styled-components";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const SingleUpload = styled(Upload)`
width: 200px !important;
.ant-upload-list-item-container, .ant-upload-select{
  margin: 0px auto auto !important;
  height: 200px !important;
  width: 200px!important;
  /* display: block !important; */
}
`

const ProductForm: React.FC<{ form: FormInstance, onFinish: any, photo?: any }> = ({ form, onFinish, photo }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  /**
   * @todo Create modal to control update of images
   */

  useEffect(() => {
    if (photo?.data) {
      setFileList([{
        uid: '-1',
        name: 'preview.png',
        status: 'done',
        url: imageHandler(photo)
      }])
    }
    // eslint-disable-next-line
  }, [])

  const handleCancel = () => setPreviewOpen(false)
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    // form.setFieldValue('photo', newFileList)
    setFileList(newFileList)
  }


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
        onFinish={onFinish}
        style={
          {
            margin: '8px auto auto',
            maxWidth: '600px'
          }
        }>
        <Center>
          <SingleUpload
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
          </SingleUpload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="preview" style={{ width: '100%' }} src={previewImage} width={'100%'} />
          </Modal>
        </Center>
        <Form.Item
          name='photo'
          hidden
        >
          <Upload fileList={fileList} />
        </Form.Item>

        <Form.Item name="name" label="Nome"
          rules={[{ required: true, message: 'Esse campo é obrigatório' }]}
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
        <Form.Item name="description" label="Descrição">
          <TextArea rows={5} />
        </Form.Item>

        <Divider />
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