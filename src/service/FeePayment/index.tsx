import { AxiosInstance } from 'axios'
import { apiEndPoints } from '../Config'

// interface DataParams {
//   q: string
//   status: string
//   pageSize: number
//   pageNumber: number
// }

export default class FeePayment {
  apiServer: AxiosInstance
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }

  async getFeePaymentList() {
    const endUrlName = apiEndPoints.paymentList

    try {
      const response = await this.apiServer.get<any>(endUrlName)

      return response
    } catch (err: any) {
      console.log('Error fetching payment list ========>', err?.message)
    }
  }
}
