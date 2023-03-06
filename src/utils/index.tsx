/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { commonListTypes, documentTypes } from 'src/types/dataTypes'

const ImagePayu = require('/public/images/payu.png') as string
const ImagePayFast = require('/public/images/payfastImage.png') as string

interface userDetails {
  fullName: string
  id: number
  role: string
  username: string
  email: string
}
export const getUserInfo = () => {
  let userData: userDetails = {
    fullName: '',
    id: 0,
    role: '',
    username: '',
    email: ''
  }
  if (window.localStorage.getItem('userData')) {
    userData = JSON.parse(window.localStorage.getItem('userData') || '{}')
  }

  return userData
}

export const getQualificationName = (qualificationList: Array<commonListTypes>, qualificationCode: string) => {
  let result = ''

  if (qualificationList?.length) {
    const response = qualificationList.find((item: commonListTypes) => item.code === qualificationCode)
    result = response?.name || ''
  }

  return result
}

export const getProgramName = (programList: Array<commonListTypes>, programCode: string) => {
  let result = ''

  if (programList?.length) {
    const response = programList.find((item: commonListTypes) => item.code === programCode)
    result = response?.name || ''
  }

  return result
}
export const getAddressName = (programList: Array<commonListTypes>, programCode: string) => {
  let result = ''

  if (programList?.length) {
    const response = programList.find((item: commonListTypes) => item.code === programCode)
    result = response?.name || ''
  }

  return result
}
export const getStudyType = (studyTypeList: Array<commonListTypes>, studyTypeCode: string) => {
  let result = ''
  if (studyTypeList?.length > 0) {
    const response = studyTypeList.find(item => item.code === studyTypeCode)
    result = response?.name || ''
  }

  return result
}

export const getSelectedDocument = (selectedDocument: Array<string | number>, documentList: Array<documentTypes>) => {
  const result: Array<documentTypes> = []
  selectedDocument?.forEach((documentId: string | number) => {
    documentList.find((item: documentTypes) => {
      if (item?.id === documentId) {
        result.push(item)
      }
    })
  })

  return result
}

export const GetPaymentImage = (type: string) => {
  if (type === 'payu') {
    return ImagePayu
  }
  if (type === 'payfast') {
    return ImagePayFast 
  }
  if (type === 'Stripe') {
  }
}
