import axios, { AxiosInstance } from 'axios'
import { apiEndPoints } from './Config'
import FeePayment from './FeePayment'
import Academic from './Academic'
import Student from './Student'
import authConfig from 'src/configs/auth'
import mem from 'mem'
import { status } from 'src/context/common'
import Common from './Common'
import Finance from './Finance'
import Operation from './Operation'

const appAPIServer: AxiosInstance = axios.create()

export const StudentService = new Student(appAPIServer)
export const FeePaymentService = new FeePayment(appAPIServer)
export const AcademicService = new Academic(appAPIServer)
export const CommonService = new Common(appAPIServer)
export const OperationService = new Operation(appAPIServer)
export const FinanceService = new Finance(appAPIServer)

export const refreshBaseAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}`
})

const refreshTokenFunction = async () => {
  const response = await refreshBaseAuth.get('/auth/refresh-token', {
    headers: { Authorization: `Bearer ${window.sessionStorage.getItem('refreshToken')}` }
  })

  const { data } = response?.data
  if (data?.access_token && data?.refresh_token) {
    await window.sessionStorage.setItem(authConfig.storageTokenKeyName, data.access_token)
    await window.sessionStorage.setItem(authConfig.refreshToken, data.refresh_token)
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

  if (error.status === status.unauthorizedStatus && err?.config?.url === apiEndPoints.refreshToken) {
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
  await window.localStorage.clear()
  window.location.href = `/student/login?returnUrl=/${pathName}`
}

addInterceptorToAxiosInstances(appAPIServer)
