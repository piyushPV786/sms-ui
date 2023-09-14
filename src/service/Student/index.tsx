import { AxiosInstance } from 'axios'
import { apiEndPoints } from '../Config'
import nProgress from 'nprogress'

export interface IPasswordUpdateRequest {
  email: string
  tempPassword: string
  newPassword: string
  confirmPassword: string
}

interface payload {
  name: string | undefined
  fileExtension: string | undefined
  status: string
}
export interface INewPassword {
  email: string
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

  async ProfilePhoto(payload: payload, email: string) {
    nProgress.start()
    const endUrlName = `${apiEndPoints.profilePhoto}${email}`
    try {
      const response = await this.apiServer.patch(endUrlName, { ...payload })
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

  async getUserDocument(params: DataParams, studentCode: string) {
    nProgress.start()
    let endUrlName = `${apiEndPoints.userDocument}/${studentCode}?pageNumber=${params?.pageNumber}&&pageSize=${params?.pageSize}`
    if (params?.q) endUrlName = `${endUrlName}&&searchString=${params?.q}`
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching user document list ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
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
  async studentScheduler(studentCode: string, date?: string) {
    nProgress.start()
    let endUrlName = `${apiEndPoints.studentSchedule}${studentCode}`
    if (date) endUrlName = `${endUrlName}?startDate=${date}&endDate=${date}`
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
  async addStudentDocument(params: any) {
    const endUrlName = `${apiEndPoints.userDocument}`
    try {
      const response = await this.apiServer.post<any>(endUrlName, { ...params })

      return response
    } catch (err: any) {
      console.log('Error fetching  Add student document ========>', err?.message)
    }
  }
  async deleteStudentDocuments(documentCode: string) {
    nProgress.start()
    const endUrlName = `${apiEndPoints.userDocument}/${documentCode}`

    try {
      const response = await this.apiServer.delete(endUrlName)

      return response.data
    } catch (err: any) {
      console.log('Error Deleting student Document ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
  async userResetPassword(email: string) {
    nProgress.start()
    const endUrlName = apiEndPoints.resetPassword
    try {
      const response = await this.apiServer.patch(endUrlName, { email })
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error Reset Password Link ========>', err?.data?.message)
      nProgress.done()

      return err
    } finally {
      nProgress.done()
    }
  }

  async userNewPassword(request: INewPassword) {
    nProgress.start()
    const endUrlName = apiEndPoints.newPassword
    try {
      const response = await this.apiServer.patch(endUrlName, { ...request })
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error update new Password ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
}
