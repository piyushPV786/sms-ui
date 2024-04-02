import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { successToast } from 'src/components/common'
import {
  BURSARY_BUTTON_STATUS,
  CommonEnums,
  MBACode,
  bursarryFeilds,
  dashboardRedirectStatus,
  docType,
  mbaDocs,
  nonMandatoryDocuments
} from 'src/components/common/Constants'
import { ApplyService, CommonService, FinanceService } from 'src/service'
import { viewProofDetails } from 'src/utils'
import { documentPayload, studentBursaryPayload } from './helper'

export const UseDocumentHook = (applicationCode: any, leadCode: any) => {
  const [masterData, setMasterData] = useState<any>({
    documentTypes: [],
    userDetails: {},
    documents: [],
    documentFormData: []
  })

  const convertDataToFormData = (documentTypes: any, userInfo: any) => {
    const result = documentTypes?.map((element: any) => {
      if (element.code === docType?.BURSARYLETTER) {
        return {
          name: element?.name,
          label: `${element?.name} and Details`,
          required: BURSARY_BUTTON_STATUS.includes(userInfo?.status),
          code: element.code,
          show: BURSARY_BUTTON_STATUS.includes(userInfo?.status)
        }
      } else if (mbaDocs.includes(element.code)) {
        return {
          name: element?.name,
          label: element?.name,
          required: userInfo?.education?.programCode === MBACode,
          code: element.code,
          show: userInfo?.education?.programCode === MBACode
        }
      } else if (nonMandatoryDocuments.includes(element.code)) {
        return {
          name: element?.name,
          label: element?.name,
          required: false,
          code: element.code,
          show: true
        }
      } else {
        return {
          name: element?.name,
          label: element?.name,
          required: true,
          code: element.code,
          show: true
        }
      }
    })
    
return result
  }

  useEffect(() => {
    const getMasterData = async (applicationCode: string) => {
      const result = await Promise.all([
        ApplyService.getDocumentsByApplicationCode(applicationCode),
        ApplyService?.GetApplicationData(applicationCode, leadCode),
        CommonService.DocumentType()
      ])

      const documentTypes = result[2].filter((item: { code: string }) => item.code !== 'PAYMENTPROOF')
      const payload = {
        ...masterData,
        documents: result[0],
        userDetails: result[1],
        documentTypes: documentTypes,
        documentFormData: convertDataToFormData(documentTypes, result[1])
      }
      setMasterData(payload)
    }

    if (applicationCode) {
      getMasterData(applicationCode)
    }
  }, [applicationCode])

  return { masterData }
}

export const UseDocumentAction = () => {
  const [progress, setProgress] = useState({})
  const router = useRouter()

  const setDocumentProgress = (element: any, percent: any, documentCode: any) => {
    setProgress({ ...progress, [element?.code]: { percent, documentCode } })
  }

  const uploadFiles = async (payload: any, masterData: any) => {
    const response = await ApplyService.uploadDocuments(payload, masterData?.userDetails?.applicationCode)
    if (response) {
      dashboardRedirectStatus.includes(masterData?.userDetails?.status)
        ? router.push(`/dashboard`)
        : router.push(`/new-prog-payment/${masterData?.userDetails?.applicationCode}`)
    } else {
      successToast(`Your document is not uploaded`)
    }
  }

  const saveAsDraft = (data: any, masterData: any) => {
    const payload = documentPayload(data, true, masterData, progress)
    if (payload) {
      uploadFiles(payload, masterData)
    }
  }
  const submitDocument = async (data: any, masterData: any) => {
    if (masterData?.userDetails?.status == CommonEnums.BURSARY_LETTER_PEND) {
      const bursaryPayload = {
        name: data[bursarryFeilds.Name],
        mobile: data[bursarryFeilds.Phone],
        address: '',
        email: data[bursarryFeilds.Email],
        occupation: '',
        vip: false,
        bursaryFinanceDto: {
          sponsorAmount: 0,
          financialYear: 2023
        },
        bursaryBankDto: {
          accountNumber: 0,
          ifscCode: '',
          branchCode: ''
        }
      }
      const res = await FinanceService.updateBursary(bursaryPayload)
      if (res) {
        const payload = studentBursaryPayload(res, masterData)
        FinanceService.updateStudentBursary(payload)
      }
    }
    const payload = documentPayload(data, false, masterData, progress)

    if (payload) {
      uploadFiles(payload, masterData)
    }
  }

  return { saveAsDraft, submitDocument, progress, setDocumentProgress }
}

export const UsePreviewFile = () => {
  const getFileUrl = async (file: any, masterData: any) => {
    if (file?.size > 0) {
      const url = URL.createObjectURL(file)
      window.open(url)
    } else {
      const response = await CommonService?.getFileLink(file?.name, masterData?.userDetails?.studentCode)
      viewProofDetails(response)
    }
  }

  return { getFileUrl }
}

export const UseDownloadDeclarationLatter = () => {
  const downloadDeclarationLatter = async (masterData: any) => {
    const response = await ApplyService?.downloadDeclarationLetter(masterData?.userDetails?.applicationCode)
    const blob = new Blob([response?.data], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })
    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(blob)
    const filename = 'declaration-letter.docx'
    downloadLink.download = filename
    document.body.appendChild(downloadLink)
    downloadLink.click()
    URL.revokeObjectURL(downloadLink.href)
  }

  return { downloadDeclarationLatter }
}
