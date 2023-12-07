import { AxiosInstance } from 'axios'
import { NEXT_PUBLIC_ACADEMIC_BACKEND_API, apiEndPoints } from '../Config'
import nProgress from 'nprogress'

interface IDataParams {
  q: string | undefined
  pageNumber: number | undefined
  pageSize: number | undefined
}

export default class Academic {
  apiServer: AxiosInstance
  baseUrl = NEXT_PUBLIC_ACADEMIC_BACKEND_API
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }

  async getallPrograms() {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.allPrograms
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
    const endUrlName = this.baseUrl + apiEndPoints.courses
    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data
    } catch (err: any) {
      console.log('Error fetching Modules detail ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
  async getExamTicket(studentCode: string | undefined) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.academics}${apiEndPoints.examTicket}/${studentCode}`
    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data
    } catch (err: any) {
      console.log('Error fetching Modules detail ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
  async getAllFacilitator() {
    nProgress.start()

    const endUrlName = this.baseUrl + apiEndPoints?.facilitator

    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data
    } catch (err: any) {
      console.log('Error fetching group list by academic year and program code========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
  async getAllProgramList(params?: IDataParams) {
    nProgress.start()
    let endUrlName = `${this.baseUrl + apiEndPoints.allProgram}`
    if (params?.q) endUrlName = `${endUrlName}?search=${params?.q}`

    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data
    } catch (err: any) {
      console.log('Error fetching all Qualification list ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }

  async getProgramListByCode(code: number | string) {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.program
    try {
      const response = await this.apiServer.get(`${endUrlName}/${code}`)

      return response?.data?.data
    } catch (err: any) {
      console.log('Error fetching Qualification list by Id details ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
}