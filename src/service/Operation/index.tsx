import { AxiosInstance } from 'axios'
import nProgress from 'nprogress'
import { apiEndPoints } from '../Config'

export default class Operation {
  apiServer: AxiosInstance
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }
  async getAttendanceDetails(studentCode: number | string | undefined) {
    nProgress.start()
    const endUrlName = `${apiEndPoints.attendance}/${studentCode}`
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
