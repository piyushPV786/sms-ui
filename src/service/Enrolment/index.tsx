import { AxiosInstance } from 'axios'
import nProgress from 'nprogress'
import { ENROLMENT_BACKEND_API, apiEndPoints } from '../Config'

export default class Enrolment {
  apiServer: AxiosInstance
  baseUrl = ENROLMENT_BACKEND_API
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }
  async getApplicationDataForBursary(applicationCode: string) {
    nProgress.start()
    const route = apiEndPoints?.enrolmentApplicationDetails.replace(':applicationCode', applicationCode)

    const url = `${this.baseUrl}${route}`
    const response = await this.apiServer.get(url)
    nProgress.done()
    const result = response?.data?.data ? response?.data?.data : {}
    nProgress.done()

    return result
  }
  async GetStudentData(ProgCode: string, studentCode: string) {
    nProgress.start()
    const route = apiEndPoints?.studentData.replace(':ProgCode', ProgCode).replace(':studentCode', studentCode)
    const endUrlName = `${this.baseUrl + route}`

    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data ? response?.data?.data : null
    } catch (err: any) {
      console.log('Error fetching student details ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
}
