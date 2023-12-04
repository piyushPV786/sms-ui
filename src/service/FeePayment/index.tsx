import { AxiosInstance } from 'axios'

export default class FeePayment {
  apiServer: AxiosInstance
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }
}
