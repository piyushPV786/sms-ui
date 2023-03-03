const BACKEND_API = process.env.BACKEND_API

export const axiosConfig = {
  baseURL: BACKEND_API,
  headers: {
    Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem('TOKEN')}`
  }
}

export const apiEndPoints = Object.freeze({
  paymentList: '/payment',
  admission: '/admissions/',
})
