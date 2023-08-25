import { AxiosInstance } from 'axios'
import { apiEndPoints } from '../Config'
import nProgress from 'nprogress'

export interface IPasswordUpdateRequest {
  email: string
  tempPassword: string
  newPassword: string
  confirmPassword: string
}

export default class Student {
  apiServer: AxiosInstance
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }

  async ResetPasswordLink(email: string) {
    nProgress.start()
    const endUrlName = apiEndPoints.forgotPassword
    try {
      const response = await this.apiServer.patch(endUrlName, { email })
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error ResetPasswordLink ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async updatePassword(request: IPasswordUpdateRequest) {
    nProgress.start()
    const endUrlName = apiEndPoints.forgotPassword
    try {
      const response = await this.apiServer.patch(endUrlName, { ...request })
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error ResetPasswordLink ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
}
