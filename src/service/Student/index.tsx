import { AxiosInstance } from 'axios'
import { apiEndPoints } from '../Config'
import nProgress from 'nprogress'

export interface IPasswordUpdateRequest {
  email: string
  tempPassword: string
  newPassword: string
  confirmPassword: string
}

interface ILogin {
  username: string
  password: string
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

  async Login(payload: ILogin) {
    nProgress.start()
    const endUrlName = apiEndPoints.login
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

  async UserProfile(code: string) {
    nProgress.start()
    const endUrlName = `${apiEndPoints.userProfile}${code}`
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error ResetPasswordLink ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async logOut() {
    nProgress.start()
    const endUrlName = apiEndPoints.logout
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

  async GetRefreshToken() {
    nProgress.start()
    const endUrlName = apiEndPoints.userProfile
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error ResetPasswordLink ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
}
