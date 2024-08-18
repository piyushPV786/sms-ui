import { AxiosInstance } from 'axios'
import nProgress from 'nprogress'
import { baseApiURL, apiEndPoints } from '../Config'
import { status } from 'src/context/common'

export default class User {
  apiServer: AxiosInstance
  baseUrl = `${baseApiURL}/user-management/`
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }
  async getUserByEmail(emailAddress: string | undefined) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.user}/${emailAddress}`
    try {
      const response = await this.apiServer.get(endUrlName)

      return response.status === status.successCode && response.data.statusCode === status.successCode
        ? response.data.data
        : []
    } catch (err: any) {
      console.log(`Error fetching ${emailAddress} details ========>`, err?.message)
    } finally {
      nProgress.done()
    }
  }
}
