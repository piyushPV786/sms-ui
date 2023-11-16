import { AxiosInstance } from 'axios'
import { apiEndPoints } from '../Config'
import nProgress from 'nprogress'

export default class Finance {
  apiServer: AxiosInstance
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }

  async updateUkheshePayment(payload: any) {
    nProgress.start()
    const endUrlName = apiEndPoints.ukheshePyment
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
    const endUrlName = apiEndPoints.ukheshePyment
    try {
      const response = await this.apiServer.post('payments/get-ukheshe-token')
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error ResetPasswordLink ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async getCurrencyRate(countryCode: string) {
    const endUrlName = `${apiEndPoints.feeConversionRate}/${countryCode}`
    try {
      const response = await this.apiServer.get(endUrlName)

      return response
    } catch (err: any) {
      console.log('Error fetching student list ========>', err?.message)
    }
  }
}
