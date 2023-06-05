import { PlusOutlined } from "@ant-design/icons";
import { Modal, UploadFile, UploadProps } from "antd"
import Upload, { RcFile } from "antd/es/upload";
import { useEffect } from "react"
import imageHandler from "../../../utils/imageHandler";
import styled from "styled-components";
import useCUploadImageHooks from "./hooks";

export type CUploadImageParams = {
  photo: any,
  onChangeImage: (fileImage: any) => void
}

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
}
`

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const CUploadImage: React.FC<CUploadImageParams> = ({ photo, onChangeImage }) => {
  const {
    previewOpen, setPreviewOpen,
    previewImage, setPreviewImage,
    previewTitle, setPreviewTitle,
    fileList, setFileList
  } = useCUploadImageHooks()

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


  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    onChangeImage(newFileList)
    setFileList(newFileList)
  }
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  const handleCancel = () => setPreviewOpen(false)
  /**
   * @todo Create modal to control update of images
   * @todo Refactoring preview to avoid position flickes
   */
  return (
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
        accept={'image/png, image/jpeg'}
      >
        {fileList.length > 0 ? null : uploadButton}
      </SingleUpload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="preview" style={{ width: '100%' }} src={previewImage} width={'100%'} />
      </Modal>
    </Center>
  )
}

export default CUploadImage