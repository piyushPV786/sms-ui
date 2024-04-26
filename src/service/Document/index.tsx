import { AxiosInstance } from 'axios'

import { DOCUMENT_BACKEND_API } from '../Config'

export default class Document {
  apiServer: AxiosInstance
  baseUrl = DOCUMENT_BACKEND_API
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }
  async documentUpdate(payload: any) {
    const url = `${this.baseUrl}document`
    const response = await this.apiServer.post(url, { ...payload })
    const result = response?.data?.data ? response?.data?.data : {}

    return result
  }
}
