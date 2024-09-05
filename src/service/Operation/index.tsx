import { AxiosInstance } from 'axios'
import nProgress from 'nprogress'
import { baseApiURL, apiEndPoints } from '../Config'

interface IPayloadProps {
  studentCode: number | string | undefined
  pageNumber: number
  pageSize: number
  query: string
}
export default class Operation {
  apiServer: AxiosInstance
  baseUrl = `${baseApiURL}/operation/`
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }
  async getAttendanceDetails(payload: IPayloadProps) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.attendance}/${payload?.studentCode}?pageNumber=${
      payload?.pageNumber
    }&pageSize=${payload?.pageSize}&search=${payload?.query}`
    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data
    } catch (err: any) {
      console.log('Error while fetching user details =========>')
    } finally {
      nProgress.done()
    }
  }
  async getClassList(scheduleCode: string) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.courselist}/${scheduleCode}`
    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data
    } catch (err: any) {
      console.log('Error while fetching user details =========>')
    } finally {
      nProgress.done()
    }
  }
  async getClass(scheduleCode: string) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.class}/${scheduleCode}`
    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data
    } catch (err: any) {
      console.log('Error while fetching user details =========>')
    } finally {
      nProgress.done()
    }
  }
}
