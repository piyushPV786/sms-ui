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
  isoCode?: string
  symbol?: string | undefined
}
export interface DataParams {
  reason: string
  id: string
}
export type addressTypes = {
  id: number
  street: string
  country: string
  state: string
  stateName?: string
  city: string
  zipcode: string
  addressType: string
}