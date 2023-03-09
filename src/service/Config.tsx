const BACKEND_API = process.env.BACKEND_API
const NEXT_PUBLIC_ACADEMIC_BACKEND_API = process.env.NEXT_PUBLIC_ACADEMIC_BACKEND_API

export const axiosConfig = {
  baseURL: BACKEND_API,
  headers: {
    Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem('TOKEN')}`
  }
}


export const academicAxiosConfig = {
  baseURL: NEXT_PUBLIC_ACADEMIC_BACKEND_API,
  headers: {
    Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem('TOKEN')}`
  }
}


export const apiEndPoints = Object.freeze({
  paymentList: '/payment',
  admission: '/admissions/',
  academics: '/academics/'
})
