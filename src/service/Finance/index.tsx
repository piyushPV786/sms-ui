import axios, { AxiosInstance } from 'axios'
import { baseApiURL, apiEndPoints } from '../Config'
import nProgress from 'nprogress'

export default class Finance {
  apiServer: AxiosInstance
  baseUrl = `${baseApiURL}/finance/`
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }

  async updateUkheshePayment(payload: any) {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.ukheshePyment
    try {
      const response = await this.apiServer.post(endUrlName, { ...payload })
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error ResetPasswordLink ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async getUkheshePaymentTocken() {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.ukhesheToken
    try {
      const response = await this.apiServer.post(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error ResetPasswordLink ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getCurrencyConversion(countryCode: string) {
    const endUrlName = `${this.baseUrl + apiEndPoints.feeConversionRate}/${countryCode}`
    try {
      const response = await this.apiServer.get(endUrlName)

      return response?.data?.data ? response?.data?.data : null
    } catch (err: any) {
      console.log('Error fetching student list ========>', err?.message)
    }
  }
  async getStudentProgram(programCode: string) {
    const route = apiEndPoints?.studentProgram.replace(':programCode', programCode)
    const url = `${this.baseUrl}${route}`
    const response = await this.apiServer.get(url)
    console.log('response =======================>', response)
    const result = response?.data?.data ? response?.data?.data : null

    return result
  }

  async updateBursary(payload: any) {
    const url = `${this.baseUrl}bursary`
    const response = await this.apiServer.post(url, { ...payload })
    const result = response?.data?.data ? response?.data?.data : {}

    return result
  }
  async updateStudentBursary(payload: any) {
    const route = `${apiEndPoints?.bursary}/student`
    const url = `${this.baseUrl}${route}`
    const response = await this.apiServer.post(url, { ...payload })
    const result = response?.data?.data ? response?.data?.data : {}

    return result
  }
  async getUkhesheToken() {
    const url = `${this.baseUrl}${apiEndPoints.ukhesheToken}`
    const response = await this.apiServer.post(url)

    return response?.data?.data ? response?.data?.data : null
  }
  async getPaymentDetails(tenantId: any, Payload: any, headers: any) {
    const url = `${process.env.NEXT_PUBLIC_PAYMENT_TENENT_LOGIN_API}${tenantId}/payments`
    const response = await axios.post(url, Payload, { headers })

    return response?.data ? response?.data : null
  }

  getPaymentInfo = async (tenantId: any, paymentId: any, headers: any) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_PAYMENT_TENENT_LOGIN_API}${tenantId}/payments/${paymentId}`
      const paymentRes = await axios.get(url, { headers })

      return paymentRes
    } catch (err: any) {
      console.log('Error while payment page ========>', err?.message)
    }
  }
  async getCurrencyRate(countryCode: string) {
    const endUrlName = `${this.baseUrl + apiEndPoints.feeConversionRate}/${countryCode}`
    try {
      const response = await this.apiServer.get(endUrlName)

      return response
    } catch (err: any) {
      console.log('Error fetching student list ========>', err?.message)
    }
  }

  async getProgramListByCode(code: number | string) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.studyModeByCode}`

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
