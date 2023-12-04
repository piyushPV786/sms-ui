import { UseFormClearErrors, UseFormReturn, UseFormSetValue, UseFormUnregister } from 'react-hook-form'

export interface UploadPaymentProofTypes {
  setValue: UseFormSetValue<any>
  clearErrors: UseFormClearErrors<any>
  watch: UseFormReturn['watch']
  unregister: UseFormUnregister<any>
  name: string
}
