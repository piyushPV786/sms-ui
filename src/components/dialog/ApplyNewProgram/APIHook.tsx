import { ISumbitPayload } from 'src/context/common'
import { AcademicService, ApplyService } from 'src/service'

export const getAllPrograms = async () => {
  const response = await AcademicService?.getallPrograms()

  return response?.data?.data
}

export const getProgramList = async (code: number | string) => {
  const response = await AcademicService?.getProgramListByCode(code)

  return response
}
export const AddMultiApplication = async (payload: ISumbitPayload) => {
  const response = await ApplyService?.AddMultiApplications(payload)

  return response
}
