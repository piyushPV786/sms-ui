import axios, { AxiosInstance } from 'axios'
import { useRouter } from 'next/router'
import { axiosConfig } from './Config'
import FeePayment from './FeePayment'

const appAPIServer: AxiosInstance = axios.create(axiosConfig)
export const FeePaymentService = new FeePayment(appAPIServer)

appAPIServer.interceptors.response.use(undefined, err => {
  const router = useRouter()
  const error = err.response

  // if error is 401
  if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
    localStorage.clear()
    router.push('/login')
  }
})
