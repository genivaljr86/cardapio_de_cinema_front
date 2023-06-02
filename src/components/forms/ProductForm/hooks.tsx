import { UploadFile } from "antd"
import { useState } from "react"

const useProductFormHooks = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  return {
    previewOpen, setPreviewOpen,
    previewImage, setPreviewImage,
    previewTitle, setPreviewTitle,
    fileList, setFileList
  }
}

export default useProductFormHooks