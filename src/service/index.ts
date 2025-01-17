import axios, { AxiosInstance } from 'axios'
import { baseApiURL, apiEndPoints } from './Config'
import FeePayment from './FeePayment'
import Academic from './Academic'
import Student from './Student'
import authConfig from 'src/configs/auth'
import mem from 'mem'
import { status } from 'src/context/common'
import Common from './Common'
import Finance from './Finance'
import Operation from './Operation'
import Apply from './Apply'
import Enrolment from './Enrolment'
import Document from './Document'
import User from './user'

const appAPIServer: AxiosInstance = axios.create()

export const StudentService = new Student(appAPIServer)
export const FeePaymentService = new FeePayment(appAPIServer)
export const AcademicService = new Academic(appAPIServer)
export const CommonService = new Common(appAPIServer)
export const OperationService = new Operation(appAPIServer)
export const FinanceService = new Finance(appAPIServer)
export const ApplyService = new Apply(appAPIServer)
export const EnrolmentService = new Enrolment(appAPIServer)
export const DocumentServices = new Document(appAPIServer)
export const UserService = new User(appAPIServer)

const refreshTokenUrl = `${baseApiURL + '/' + apiEndPoints.refreshToken}`

appAPIServer.interceptors.request.use(
  config => {
    if (config.headers && config?.url === refreshTokenUrl) {
      config.headers['Authorization'] = `Bearer ${window.sessionStorage.getItem(authConfig.refreshToken)}`
    } else if (config.headers) {
      config.headers['Authorization'] = `Bearer ${window.sessionStorage.getItem(authConfig.storageTokenKeyName)}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const refreshTokenFunction = async () => {
  const response = await StudentService?.getRefreshToken()
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { data } = response?.data

  if (data?.access_token && data?.refresh_token) {
    await window.sessionStorage.setItem(authConfig.storageTokenKeyName, data.access_token)
    await window.sessionStorage.setItem(authConfig.refreshToken, data.refresh_token)
  }

  if (data?.status === status.unauthorizedStatus) {
    redirectToLoginPage()
  }

  return data
}
const maxAge = 10000
const memoizedRefreshToken = mem(refreshTokenFunction, {
  maxAge
})

const requestInterceptor = (config: any) => {
  if (config.headers) {
    config.headers['Authorization'] = `Bearer ${window.sessionStorage.getItem(authConfig.storageTokenKeyName)}`
  }

  return config
}

const responseInterceptor = (response: any) => {
  if (response) {
    return response
  }
}
const errorInterceptor = async (err: any) => {
  const error = err.response
  const config = error?.config

  if (error.status === status.unauthorizedStatus && err?.config?.url === refreshTokenUrl) {
    redirectToLoginPage()
  }

  // if error is 401

  if (error.status === status.unauthorizedStatus && !config?.sent && !config?.__isRetryRequest) {
    config.sent = true
    const response = await memoizedRefreshToken()
    if (response?.status === 200 && response?.access_token && response?.refresh_token) {
      config.headers['Authorization'] = `Bearer ${response?.access_token}`
    }

    return appAPIServer(error.config)
  }

  return Promise.reject(error)
}

const addInterceptorToAxiosInstances = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(requestInterceptor)
  axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor)
}

const redirectToLoginPage = async () => {
  let pathName = window.location.pathname
  pathName = pathName.replace(/^\/[\w\d]+\//, '')
  await window.sessionStorage.clear()
  window.location.href = `${process.env.NEXT_PUBLIC_STUDENT_BASE_URL}/auth/login?returnUrl=/${pathName}`
}

addInterceptorToAxiosInstances(appAPIServer)
