/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { commonListTypes, documentTypes } from 'src/types/dataTypes'
import axios from 'axios'
import nProgress from 'nprogress'
import { Dispatch, SetStateAction } from 'react'
import { GoogleAnalyticsScript, status } from 'src/context/common'
import { CommonService } from 'src/service'
import { IProgram } from 'src/types/common'
import { AxiosResponse } from 'axios'
import { AuthValuesType } from 'src/context/types'
import {
  APPLICATION_STATUS,
  BLUE,
  DARK_GRAY,
  GREEN,
  NAVY_BLUE,
  ORANGE,
  acceptedFileTypes,
  customStatus
} from 'src/components/common/Constants'

const ImagePayu = require('/public/images/payu.png') as string
const ImagePayFast = require('/public/images/payfastImage.png') as string
const ImageUkheshe = require('/public/images/newUkheshy.png') as string

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
  if (window.sessionStorage.getItem('userData')) {
    userData = JSON.parse(window.sessionStorage.getItem('userData') || '{}')
  }

  return userData
}

export const getStatusColor = (status: any) => {
  const applicationStatus = status

  switch (applicationStatus) {
    case APPLICATION_STATUS.SAVED_AS_DRAFT:
      return DARK_GRAY
    case APPLICATION_STATUS.BURSARY_DOCUMENTS_ACCEPTED:
    case APPLICATION_STATUS.RESUBMIT_BURSARY_DOCUMENTS:
    case APPLICATION_STATUS.BURSARY_CONFIRMATION_PENDING:
    case APPLICATION_STATUS.UPLOAD_APPLICATION_DOCUMENTS:
    case APPLICATION_STATUS.RESUBMIT_APPLICATION_DOCUMENTS:
    case APPLICATION_STATUS.RMAT_PENDING:
    case APPLICATION_STATUS.PROGRAM_FEES_PENDING:
    case APPLICATION_STATUS.UPLOAD_BURSARY_DOCUMENTS:
    // eslint-disable-next-line no-duplicate-case, no-fallthrough
    case APPLICATION_STATUS.RESUBMIT_BURSARY_DOCUMENTS:
      return ORANGE
    case APPLICATION_STATUS.ENROLLED_TO_APPLICATION:
    case APPLICATION_STATUS.APPLICATION_FEE_ACCEPTED:
    case APPLICATION_STATUS.ENROLMENT_ACCEPTED:
    case APPLICATION_STATUS.APPLICATION_DOCUMENTS_ACCEPTED:
      return BLUE
    case APPLICATION_STATUS.APPLICATION_DOCUMENTS_UPLOADED:
    case APPLICATION_STATUS.BURSARY_DOCUMENTS_UPLOADED:
      return GREEN
    case APPLICATION_STATUS.REQUEST_FOR_BURSARY:
      return NAVY_BLUE
    default:
      return DARK_GRAY
  }
}
export const GetPaymentImage = (type: string) => {
  if (type === 'payu') {
    return ImagePayu
  }
  if (type === 'payfast') {
    return ImagePayFast
  }
  if (type === 'ukheshe') {
    return ImageUkheshe
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
        type: ext === 'pdf' ? 'application/pdf' : ext === 'jpeg' ? 'image/jpeg' : 'image/png'
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
  studentCode: string | undefined,
  setViewFileLoader?: Dispatch<SetStateAction<{ [key: string]: boolean } | undefined>>,
  fileCode?: string
) => {
  const response = await CommonService.getFileUrl(fileName, studentCode)
  if (response?.data?.statusCode === status?.successCode) {
    downloadFile(response?.data?.data, fileName, setViewFileLoader, fileCode)
  }
}

export const DDMMYYYDateFormat = (date: Date) => {
  const newDate = new Date(date)

  const day = String(newDate.getDate()).padStart(2, '0')
  const month = String(newDate.getMonth() + 1).padStart(2, '0')
  const year = newDate.getFullYear()

  return `${day}-${month}-${year}`
}

export const YYYYMMDDDateFormat = (date: Date) => {
  const newDate = new Date(date)

  const day = String(newDate.getDate()).padStart(2, '0')
  const month = String(newDate.getMonth() + 1).padStart(2, '0')
  const year = newDate.getFullYear()

  return `${year}-${month}-${day}`
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

export const programCodeToName = (programList: IProgram | undefined, code: string) => {
  let programName = ''
  if (programList?.length) {
    const program = programList?.find(item => item?.code === code)
    if (program?.name) {
      programName = program?.name
    }
  }

  return programName
}
export const getName = (list: Array<commonListTypes>, code: string) => {
  if (list?.length > 0) {
    return list?.find(item => item.code === code)?.name ?? code
  }

  return code
}

export const getState = (list: Array<commonListTypes>, isoCode: string) => {
  if (list?.length > 0) {
    return list?.find(item => item.isoCode === isoCode)?.name ?? isoCode
  }

  return isoCode
}

export const getSymbol = (list: Array<commonListTypes>, code: string) => {
  if (list?.length > 0) {
    return list?.find(item => item.code === code)?.symbol ?? code
  }

  return code
}

export const getUkheshePayload = (
  getPaymentResponse: AxiosResponse<any, any> | undefined,
  amount: string | null,
  feeModeCode: string | null,
  currencyCode: string | null,
  applicationCode: string,
  auth: AuthValuesType,
  qualificaion: string
) => {
  return {
    transactionId: getPaymentResponse?.data?.externalUniqueId,
    totalAmount: Number(amount),
    totalPaidAmount: getPaymentResponse?.data?.amount,
    feeModeCode: feeModeCode,
    currencyCode: currencyCode,
    paymentStatus: getPaymentResponse?.data?.status,
    discountCode: '',
    discountAmount: 0,
    studentCode: auth?.user?.studentCode,
    applicationCode: applicationCode,
    paymentType: 'ONLINE',
    ukheshe: {
      paymentId: getPaymentResponse?.data?.paymentId,
      gatewayTransactionId: getPaymentResponse?.data?.externalUniqueId,
      amount: getPaymentResponse?.data?.amount,
      status: getPaymentResponse?.data?.status,
      walletId: getPaymentResponse?.data?.walletId,
      currency: getPaymentResponse?.data?.currency,
      externalUniqueId: getPaymentResponse?.data?.externalUniqueId,
      paymentType: getPaymentResponse?.data?.paymentType
    },
    programName: qualificaion
  }
}

export const DDMMYYDateFormate = (date: Date) => {
  const newDate: Date = new Date(date)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const formateDate = {
    date: `${minTwoDigits(newDate.getDate())}-${monthNames[newDate.getMonth()]}-${newDate.getFullYear()}`
  }

  return formateDate
}

export const DateFormateToDay = (date: Date) => {
  const newDate: Date = new Date(date)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayOfWeek = daysOfWeek[newDate.getDay()]

  return dayOfWeek
}

export const getFileUrlToShow = async (
  fileName: string,
  studentCode: string | undefined,
  setViewFileLoader?: Dispatch<SetStateAction<{ [key: string]: boolean } | undefined>>,
  fileCode?: string
) => {
  const response = await CommonService.getFileUrl(fileName, studentCode)
  if (response?.data?.statusCode === status?.successCode) {
    viewProofDetails(response?.data?.data, setViewFileLoader, fileCode)
  }
}

export const getSessionStorageData = (key: string) => {
  const localData = window.sessionStorage.getItem(key)
  if (localData) {
    return JSON.parse(localData)
  }

  return null
}

export const checkProd = () => {
  if (process.env.NEXT_PUBLIC_USER_REDIRECT_URL === GoogleAnalyticsScript.prodURL) return true
  else return false
}

//common functions//
export const fileValidation = (value: any, element: any) => {
  if ((!value || value?.length === 0 || value[0]?.name?.length === 0) && element?.required === true) {
    return 'This file is Required please upload file'
  }
  if (value && element?.code) {
    if (value[0] && !acceptedFileTypes.includes(value[0]?.type)) {
      return 'This file type is not accepted please upload from accepted file types'
    } else if (value[0]?.size > 20 * 1024 * 1024 && element?.code === customStatus?.EDFORALLCONTRACT) {
      console.log('in codition')

      return 'File size should be at most 20MB'
    } else if (value[0]?.size > 3 * 1024 * 1024 && element?.code !== customStatus?.EDFORALLCONTRACT) {
      return 'File size should be at most 3MB'
    }
  }

  return true
}

export const removeExtension = (fileName: string) => {
  const nameWithoutExtension = fileName?.split('.').slice(0, -1).join('.')

  return nameWithoutExtension
}

export const setDocumentValue = (documents: any, setValue: any) => {
  documents?.forEach((element: any) => {
    const extension = element?.name?.split('.').pop()
    const file: File = new File([''], `${element?.code}.${extension}`, {
      type: element?.fileExtension,
      lastModified: element?.updatedAt
    })

    const value = {
      file: [file],
      status: element?.status,
      comment: element?.comment
    }

    setValue(element?.documentTypeCode, value)
  })
}

export const compareDates = (date1: Date, date2: Date): number => {
  // Convert both dates to milliseconds since epoch
  const time1 = date1.getTime()
  const time2 = date2.getTime()

  // Compare the milliseconds
  if (time1 < time2) {
    return -1
  } else if (time1 > time2) {
    return 1
  } else {
    return 0
  }
}
