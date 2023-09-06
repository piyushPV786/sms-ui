/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { commonListTypes, documentTypes } from 'src/types/dataTypes'
import axios from 'axios'
import nProgress from 'nprogress'
import { Dispatch, SetStateAction } from 'react'
import { status } from 'src/context/common'
import { CommonService } from 'src/service'

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
export const calculateFileSize = (size: number) => {
  return size / 1024 > 1024 ? `${(size / 1024 / 1024).toFixed(2)} MB` : `${Math.round(size / 1024)} KB`
}

export const serialNumber = (params: number, pageNumber: number, pageSize: number) => {
  return pageNumber === 1 ? params + 1 : (pageNumber - 1) * pageSize + (params + 1)
}

export const minTwoDigits = (n: number) => {
  return (n < 10 ? '0' : '') + n
}

export const viewProofDetails = (
  url: string,
  setViewFileLoader?: Dispatch<SetStateAction<{ [key: string]: boolean } | undefined>>,
  fileCode?: string
) => {
  const fileUrl = url.split('?')
  const data = fileUrl[0]
  const ext = data.split('.').pop()
  nProgress.start()
  axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => {
      const file = new Blob([response.data], {
        type: ext === 'pdf' ? 'application/pdf' : 'image/jpeg'
      })
      !!setViewFileLoader && !!fileCode && setViewFileLoader(prev => ({ ...prev, [fileCode]: false }))
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL)
      nProgress.done()
    })
    .catch(error => {
      console.log('Error viewing file', error.message)
      nProgress.done()
    })
}

export const downloadFile = (
  url: any,
  fileName: string,
  setViewFileLoader?: Dispatch<SetStateAction<{ [key: string]: boolean } | undefined>>,
  fileCode?: string
) => {
  const fileUrl = url?.split('?')
  const data = fileUrl[0]
  const ext = data.split('.').pop()

  axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => {
      const file = new Blob([response.data], {
        type:
          ext === 'pdf'
            ? 'application/pdf'
            : ext === 'xls'
            ? 'application/xls'
            : ext === 'xlsx'
            ? 'application/xlsx'
            : 'image/jpeg'
      })
      !!setViewFileLoader && !!fileCode && setViewFileLoader(prev => ({ ...prev, [fileCode]: false }))
      const fileURL = URL.createObjectURL(file)
      const aElement = document.createElement('a')
      aElement.setAttribute('download', fileName)
      const href = fileURL
      aElement.href = href
      aElement.setAttribute('target', '_blank')
      aElement.click()
      URL.revokeObjectURL(href)
    })
    .catch(error => {
      console.log('Error viewing file', error.message)
    })
}
export const getFileUrl = async (
  fileName: string,
  setViewFileLoader?: Dispatch<SetStateAction<{ [key: string]: boolean } | undefined>>,
  fileCode?: string
) => {
  const response = await CommonService.getFileUrl(fileName)
  if (response?.data?.statusCode === status?.successCode) {
    downloadFile(response?.data?.data, fileName, setViewFileLoader, fileCode)
  }
}

export const DDMMYYYDateFormat = (date: Date) => {
  const newDate = new Date(date)

  return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
}

export const DateFormat = (date: Date) => {
  const newDate: Date = new Date(date)
  const weekday: Array<number | string> = new Array(7)

  weekday[0] = 'Sunday'
  weekday[1] = 'Monday'
  weekday[2] = 'Tuesday'
  weekday[3] = 'Wednesday'
  weekday[4] = 'Thursday'
  weekday[5] = 'Friday'
  weekday[6] = 'Saturday'
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return `${weekday[newDate.getDay()]}, ${newDate.getDate()} ${
    monthNames[newDate.getMonth()]
  }, ${newDate.getFullYear()}`
}
