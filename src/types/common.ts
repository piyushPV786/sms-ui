export type IProgram = program[]

export interface program {
  id: number
  isActive: boolean
  createdBy: any
  createdAt: string
  updatedBy: any
  updatedAt: string
  deletedBy: any
  deletedAt: any
  name: string
  code: string
  description: any
  nqfLevel: string
  noOfYear: number
  category: string
  isRmat: boolean
  acceptanceLetter: string
  confirmationLetter: string
  SAQA_ID: string
  studyModeCodes: string
}

export interface UpdatePayment {
  rows: []
  programCode: string
  allProgram: IProgram | undefined
  currencyList: []
}

export interface UpdatepaymentItem {
  id: number
  dueDate: string
  dueAmount: number
  currencyCode: string
  feeModeCode: string
  programName: string
}

export interface IIndex {
  api: {
    getRowIndex: (arg0: number) => number
  }
  row: {
    id: number
  }
}

export interface IDefaultValue {
  message: string
  data: any[]
  statusCode: string
}

export interface IQueryRowData {
  isActive: boolean
  createdAt: string
  updatedAt: string
  id: number
  createdBy: null | any
  updatedBy: null | any
  subject: string
  queryType: string
  description: string
  status: string
  documentCode: string
  documentName: string
}
export interface CellType {
  row: IQueryRowData
}

export interface IQueryType {
  id: number
  code: string
  name: string
}

export interface IQueryStatus {
  id: number
  code: string
  name: string
}

export interface IQueryDefaultValues {
  subject: string
  category: string
  description: string
  file: File | null
}

export interface IPaymentPayload {
  externalUniqueId: string
  amount: string
  currency: string
  type: string
  paymentMechanism: string
  paymentData: string
}

export interface IPaymentResponse {
  paymentId: number
  externalUniqueId: string
  status: string
  amount: number
  currency: string
  additionalFields: any[]
  acceptedCardSchemes: any[]
  acceptedPaymentMechanisms: any[]
  completionUrl: string
  paymentType: string
  created: string
  fee: number
  walletId: number
}

export interface IDataPaymentRow {
  programName: string
  currencyCode: string
  totalAmount: string
  paymentDate: string
  dueDate: string
  referenceNumber: string
}
export interface IPaymentRow {
  row: IDataPaymentRow
}
