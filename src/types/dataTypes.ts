export type educationTypes = {
  id: number
  programCode: string
  studyModeCode: string
  studyTypeCode: string
}
export type addressTypes = {
  id: number
  street: string
  country: string
  state: string
  city: string
  zipcode: string
  addressType: string
}
export type documentTypes = {
  id: number | string
  name: string
  status: string
  documentTypeCode: string
  Comments: string
}
export type commonListTypes = {
  id: number | string
  name: string
  code: string
}
export type bursaryTypes = {
  id: number | string
  name: string
  mobile: string
  address: string
  email: string
  occupation: string
  vip: boolean
  bursaryFinances: Array<bursaryFinancesTypes>
}
export type bursaryFinancesTypes = {
  id: number | string
  sponsorAmount: number
  financialYear: number
  sanctionedAmount: number
  remaningAmount: number
  bursaryId: number | string
}
export interface StudentParams {
  enrolmentId: string
  firstName: string
  lastName: string
  emailId: string
  mobileNumber: string
}
export interface CourseParams {
  enrolmentId: number | string
  qualificationCode: string
  studyMode: string
  studyType: string
}
export interface AddressParams {
  enrolmentId: string
  addressType: string
  address: string
  country: string
  state: string
  city: string
  zipCode: string
}
export interface DataParams {
  reason: string
  id: string
}
