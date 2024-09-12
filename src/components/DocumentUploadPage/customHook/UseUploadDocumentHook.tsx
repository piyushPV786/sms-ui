import { useState } from 'react'
import { successToast } from 'src/components/common'
import { DocumentStatus } from 'src/components/common/Constants'
import { CommonService, DocumentServices } from 'src/service'

export const UseUploadDocumentHook = (masterData: any) => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [documentCode, setDocumentCode] = useState('')

  const updateProgress = (percent: any) => {
    setUploadProgress(percent)
  }

  const uploadDocument = async (file: any, element: any) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { applicationCode } = masterData?.userDetails
    const studentCode = masterData?.userDetails?.lead?.studentCode

    const setUploadPercent = (progressEvent: any) => {
      const uploadPercent = Math.ceil((progressEvent.loaded / progressEvent.total) * 100)
      updateProgress(uploadPercent)
    }

    if (file?.length && studentCode) {
      const fileName = file[0].name
      const ext = fileName?.split('.').pop().toLowerCase()
      const documentCode = await CommonService?.DocumentCode()

      setDocumentCode(documentCode)
      const name = `${documentCode}.${ext}`
      const signedUrl = await CommonService?.getFileSignUrl(name, `.${ext}`, studentCode)
      const response = await CommonService.uploadDocumentToAws(signedUrl, file[0], setUploadPercent)
      if (response?.status === 200) {
        const documentUpdatePayload = {
          name: name,
          fileExtension: `.${ext}`,
          status: DocumentStatus.Pending,
          documentTypeCode: element?.code,
          applicationCode: applicationCode,
          code: documentCode
        }
        const updateDocumentResponse = await DocumentServices?.documentUpdate(documentUpdatePayload)
        if (updateDocumentResponse?.status === 200) {
          successToast(`Your document is uploaded successfully.`)
        }
      }
    }
  }

  return { uploadDocument, uploadProgress, documentCode, setUploadProgress }
}
