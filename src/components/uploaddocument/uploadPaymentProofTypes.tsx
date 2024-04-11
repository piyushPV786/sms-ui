import { UseFormClearErrors, UseFormSetValue, UseFormUnregister } from 'react-hook-form'

export interface UploadPaymentProofTypes {
  setValue: UseFormSetValue<any>
  clearErrors: UseFormClearErrors<any>
  watch: any
  unregister: UseFormUnregister<any>
  name: string
}
