import { AxiosInstance } from 'axios'
import { APPLY_BACKEND_API, apiEndPoints } from '../Config'
import nProgress from 'nprogress'
import { ISumbitPayload } from 'src/context/common'

export default class Apply {
  apiServer: AxiosInstance
  baseUrl = APPLY_BACKEND_API

  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async GetApplicationData(appCode: string, leadId: string) {
    nProgress.start()
    const route = apiEndPoints?.applicationDetails.replace(':applicationCode', appCode).replace(':leadId', leadId)
    const endUrlName = `${this.baseUrl + route}`

    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data ? response?.data?.data : null
    } catch (err: any) {
      console.log('Error Updating student Type ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
  async AddMultiApplications(payload: ISumbitPayload) {
    nProgress.start()

    const endUrlName = `${this.baseUrl + apiEndPoints?.multipleApplication}`

    try {
      const response = await this.apiServer.post(endUrlName, payload)

      return response?.data
    } catch (err: any) {
      console.log('Error Multi Application ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
  async getStudentDetail(studentCode: string) {
    const route = apiEndPoints?.getStudentDetail?.replace(':studentCode', studentCode)
    const endUrlName = `${this.baseUrl + route}`
    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data ? response?.data?.data : null
    } catch (err: any) {
      console.log('Error Updating student Type ========>', err)
    } finally {
      nProgress.done()
    }
  }
  async GetApplicationDetails(leadId: string) {
    nProgress.start()
    const route = apiEndPoints?.getLeadDetails?.replace(':leadId', leadId)
    const endUrlName = `${this.baseUrl + route}`

    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data
    } catch (err: any) {
      console.log('Error Updating student Type ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
  async applicationDiscount(studentType: any, applicationCode: any, discountCode: any) {
    const url = `${this.baseUrl}${apiEndPoints?.application}/${applicationCode}/discount/${discountCode}?studentType=${studentType}`

    try {
      const response = await this.apiServer.get(url)
      const result = response?.data?.data ? response?.data?.data : {}

      return result
    } catch (e) {}
  }

  async getDocumentsByApplicationCode(applicationCode: any) {
    const url = `${this.baseUrl}${apiEndPoints?.application}/documents/${applicationCode}`
    const response = await this.apiServer.get(url)

    return response?.data?.data ? response?.data?.data : null
  }

  async uploadDocuments(payload: any, applicationCode: any) {
    try {
      const url = `${this.baseUrl}${apiEndPoints?.application}/${applicationCode}/document`
      const response = await this.apiServer.post(url, payload)

      return response?.data?.data ? response?.data?.data : null
    } catch (e) {}
  }

  async downloadDeclarationLetter(applicationCode: any) {
    const url = `${this.baseUrl}${apiEndPoints?.application}/${applicationCode}/${apiEndPoints?.declarationForm}`
    const response = await this.apiServer.get(url, { responseType: 'blob' })

    return response ? response : null
  }

  async getPayuDetais(applicationCode: string, payload: any) {
    const url = `${this.baseUrl}${apiEndPoints.application}/${applicationCode}${apiEndPoints.payu}`
    const response = await this.apiServer.post(url, payload)
    const result = response?.data?.data ? response?.data?.data : {}

    return result
  }
  async getRmatDetails(studentCode: string) {
    const route = apiEndPoints?.rmat.replace(':studentCode', studentCode)
    const url = `${this.baseUrl}${route}`
    const response = await this.apiServer.get(url)

    return response?.data?.data ? response?.data?.data : []
  }
}
