import { AxiosInstance } from 'axios'
import { apiEndPoints } from '../Config'
import nProgress from 'nprogress'

export default class Academic {
  apiServer: AxiosInstance
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }

  async getStudentAcademicDetails() {
    nProgress.start()
    const endUrlName = apiEndPoints.academics
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching student detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getallPrograms() {
    nProgress.start()
    const endUrlName = apiEndPoints.allPrograms
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching student detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async getAllCourses() {
    nProgress.start()
    const endUrlName = apiEndPoints.courses
    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data
    } catch (err: any) {
      console.log('Error fetching Modules detail ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
}
