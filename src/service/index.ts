import axios, { AxiosInstance } from 'axios'
import { axiosConfig, academicAxiosConfig, studentBaseConfig, apiEndPoints, commonAxiosConfig } from './Config'
import FeePayment from './FeePayment'
import Academic from './Academic'
import Student from './Student'
import authConfig from 'src/configs/auth'
import mem from 'mem'
import { status } from 'src/context/common'
import Common from './Common'

const appAPIServer: AxiosInstance = axios.create(axiosConfig)
const AcademicAPIServer: AxiosInstance = axios.create(academicAxiosConfig)
const StudentBaseApiServer: AxiosInstance = axios.create(studentBaseConfig)
const CommonBaseApiServer: AxiosInstance = axios.create(commonAxiosConfig)

export const StudentService = new Student(StudentBaseApiServer)
export const FeePaymentService = new FeePayment(appAPIServer)
export const AcademicService = new Academic(AcademicAPIServer)
export const CommonService = new Common(CommonBaseApiServer)

// StudentBaseApiServer.interceptors.request.use(
//   config => {
//     if (config.headers) {
//       console?.log(
//         'window.localStorage.getItem(authConfig.storageTokenKeyName)',
//         window.localStorage.getItem(authConfig.storageTokenKeyName)
//       )
//       config.headers['Authorization'] = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
//     }

//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
export const refreshBaseAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}`
})

const refreshTokenFunction = async () => {
  const response = await refreshBaseAuth.get('/auth/refresh-token', {
    headers: { Authorization: `Bearer ${window.localStorage.getItem('refreshToken')}` }
  })

  const { data } = response?.data
  if (data?.access_token && data?.refresh_token) {
    await window.localStorage.setItem(authConfig.storageTokenKeyName, data.access_token)
    await window.localStorage.setItem(authConfig.refreshToken, data.refresh_token)
  }

  return data
}
const maxAge = 10000
const memoizedRefreshToken = mem(refreshTokenFunction, {
  maxAge
})

const requestInterceptor = (config: any) => {
  if (config.headers) {
    config.headers['Authorization'] = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
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

  // if error is 401

  // if (
  //   error.status === status.unauthorizedStatus &&
  //   !config?.sent &&
  //   !config?.__isRetryRequest &&
  //   config.url === apiEndPoints.refreshToken
  // ) {
  //   let pathName = window.location.pathname
  //   pathName = pathName.replace(/^\/[\w\d]+\//, '')
  //   await window.localStorage.clear()
  //   window.location.href = `/student/login?returnUrl=/${pathName}`
  // }

  if (error.status === status.unauthorizedStatus && !config?.sent && !config?.__isRetryRequest) {
    console.log('401 ===========>')
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

addInterceptorToAxiosInstances(StudentBaseApiServer)
addInterceptorToAxiosInstances(appAPIServer)
addInterceptorToAxiosInstances(AcademicAPIServer)
addInterceptorToAxiosInstances(CommonBaseApiServer)
