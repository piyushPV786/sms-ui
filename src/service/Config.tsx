const BACKEND_API = process.env.NEXT_PUBLIC_ENROLMENT_BACKEND_API
const NEXT_PUBLIC_ACADEMIC_BACKEND_API = process.env.NEXT_PUBLIC_ACADEMIC_BACKEND_API
const BaseStudentApi = process.env.NEXT_PUBLIC_STUDENT_BASE_API

export const axiosConfig = {
  baseURL: BACKEND_API,
  headers: {
    Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem('TOKEN')}`
  }
}
export const studentBaseConfig = {
  baseURL: BaseStudentApi,
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
  academics: '/academics/',
  forgotPassword: 'user/forgot-password',
  updatePassword: 'user/update-password'
})
