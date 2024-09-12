import { AxiosInstance } from 'axios'
import { baseApiURL, apiEndPoints } from '../Config'
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

export interface QueryPayload {
  studentCode: string | undefined
  subject: string
  category: string
  description: string
  fileName: string | null
  fileType: string | null
  documentTypeCode: string
}

export interface electiveParam {
  username: string
  courseCodes: string[]
  programCode: string
}

export default class Student {
  apiServer: AxiosInstance
  baseUrl = `${baseApiURL}/student/`
  constructor(apiServer: AxiosInstance) {
    this.apiServer = apiServer
  }

  async getRefreshToken() {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.refreshToken
    const response = await this.apiServer.get(endUrlName)
    nProgress.done()

    return response
  }

  async ResetPasswordLink(email: string) {
    nProgress.start()
    const endUrlName = this.baseUrl + apiEndPoints.forgotPassword
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
    const endUrlName = this.baseUrl + apiEndPoints.forgotPassword
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
    const endUrlName = this.baseUrl + apiEndPoints.login
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
    const endUrlName = `${this.baseUrl + apiEndPoints.profilePhoto}${email}`
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

  async payOfflinefee(
    payload: {
      documentTypeCode: string
      fileName: string
      fileType: string
      amount: string | null
      feeModeCode: string | null
      discountAmount: number
      discountCode: string
      currencyCode: string | null
    },
    studentCode: string | null
  ) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.offlinePayment}/${studentCode}/offline`
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
    const endUrlName = `${this.baseUrl + apiEndPoints.userProfile}${code}`
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
    const endUrlName = this.baseUrl + apiEndPoints.logout
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
    const endUrlName = `${this.baseUrl + apiEndPoints.studentApplication}${studentCode}`
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
    let endUrlName = `${this.baseUrl + apiEndPoints.paymentList}?studentCode=${studentCode}&&pageNumber=${
      params?.pageNumber
    }&&pageSize=${params?.pageSize}`
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
    let endUrlName = `${this.baseUrl + apiEndPoints.userDocument}/${studentCode}?pageNumber=${
      params?.pageNumber
    }&&pageSize=${params?.pageSize}`
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
    const endUrlName = `${this.baseUrl + apiEndPoints.address}${studentCode}`
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
  async studentScheduler(studentCode: string, startDate?: string, endDate?: string) {
    nProgress.start()
    let endUrlName = `${this.baseUrl + apiEndPoints.studentSchedule}${studentCode}`
    if (startDate) endUrlName = `${endUrlName}?startDate=${startDate}&endDate=${endDate}`
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error Scheduler Data ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }
  async addStudentDocument(params: any) {
    const endUrlName = `${this.baseUrl + apiEndPoints.userDocument}`
    try {
      const response = await this.apiServer.post<any>(endUrlName, { ...params })

      return response
    } catch (err: any) {
      console.log('Error fetching  Add student document ========>', err?.message)
    }
  }
  async deleteStudentDocuments(documentCode: string) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.userDocument}/${documentCode}`

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
    const endUrlName = this.baseUrl + apiEndPoints.resetPassword
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
    const endUrlName = this.baseUrl + apiEndPoints.newPassword
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

  async downloadTranscript(studentCode: number | string) {
    nProgress.start()
    const endUrlName = `${this.baseUrl}academics/` + apiEndPoints.downloadTranscript
    try {
      const response = await this.apiServer.get(`${endUrlName}/${studentCode}`, {
        responseType: 'blob'
      })

      return response
    } catch (err: any) {
      console.log('Error in downloading academic transcript ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
  async getQueryList(params: DataParams, studentCode: string) {
    nProgress.start()
    let endUrlName = `${this.baseUrl + apiEndPoints.query}/${studentCode}?pageNumber=${params?.pageNumber}&pageSize=${
      params?.pageSize
    }`
    if (params?.q) endUrlName = `${endUrlName}&search=${params?.q}`

    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching payment list ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async createQuery(payload: QueryPayload) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.query}/${payload.studentCode}`
    try {
      const response = await this.apiServer.post(endUrlName, payload)

      return response
    } catch (err: any) {
      console.log('Error in saving academic head Details ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
  async getRolloverList(studentCode: string) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.rollover}/${studentCode}/programs`
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching rollover list ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async rollover(studentCode: string, courseCodes: string[]) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + apiEndPoints.rollover}/${studentCode}/rollover`
    try {
      const response = await this.apiServer.post(endUrlName, { courseCodes })

      return response
    } catch (err: any) {
      console.log('Error in saving rollover Details ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }

  async getStudentAcademicDetails(studentCode: string) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + 'academics/' + apiEndPoints.academics}${studentCode}`
    try {
      const response = await this.apiServer.get(endUrlName)
      nProgress.done()

      return response
    } catch (err: any) {
      console.log('Error fetching student detail ========>', err?.message)
      nProgress.done()
    }
    nProgress.done()
  }

  async enrollElective(electiveParam: electiveParam) {
    nProgress.start()
    const endUrlName = `${this.baseUrl + 'academics/' + apiEndPoints.enrollElective}`
    try {
      const response = await this.apiServer.post(endUrlName, electiveParam)

      return response
    } catch (err: any) {
      console.log('Error in saving Elective module Details ========>', err?.message)
    } finally {
      nProgress.done()
    }
  }
}
