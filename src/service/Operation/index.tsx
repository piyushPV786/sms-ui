import { AxiosInstance } from 'axios'
import nProgress from 'nprogress'
import { apiEndPoints } from '../Config'

interface IPayloadProps {
  studentCode: number | string | undefined
  pageNumber: number
  pageSize: number
  query: string
}
export default class Operation {
  apiServer: AxiosInstance
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }
  async getAttendanceDetails(payload: IPayloadProps) {
    nProgress.start()
    const endUrlName = `${apiEndPoints.attendance}/${payload?.studentCode}?pageNumber=${payload?.pageNumber}&pageSize=${payload?.pageSize}&search=${payload?.query}`
    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data
    } catch (err: any) {
      console.log('Error while fetching user details =========>')
    } finally {
      nProgress.done()
    }
  }
  async getClassList(studentCode: number | string) {
    nProgress.start()
    const endUrlName = `${apiEndPoints.courseList}/${studentCode}`
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
