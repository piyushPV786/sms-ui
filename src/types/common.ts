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
}