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

interface IAddressP {
  street: string
  country: string
  state: string
  city: string
  zipcode: number
}

export interface DataParams {
  q?: string
  pageSize: number
  pageNumber: number
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

  async getUserProfileDetails(studentCode: string) {
    nProgress.start()
    const endUrlName = `${apiEndPoints.studentApplication}${studentCode}`
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
  async getFeePaymentList(params: DataParams, studentCode: string) {
    let endUrlName = `${apiEndPoints.paymentList}?studentCode=${studentCode}&&pageNumber=${params?.pageNumber}&&pageSize=${params?.pageSize}`
    if (params?.q) endUrlName = `${endUrlName}&&search=${params?.q}`

    try {
      const response = await this.apiServer.get<any>(endUrlName)

      return response
    } catch (err: any) {
      console.log('Error fetching payment list ========>', err?.message)
    }
  }

  async updateAddress(payload: IAddressP, studentCode: string) {
    nProgress.start()
    const endUrlName = `${apiEndPoints.address}${studentCode}`
    try {
      const response = await this.apiServer.patch(endUrlName, payload)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error ResetPasswordLink ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
}
