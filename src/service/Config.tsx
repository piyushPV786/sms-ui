const BACKEND_API = process.env.NEXT_PUBLIC_ENROLMENT_BACKEND_API
const NEXT_PUBLIC_ACADEMIC_BACKEND_API = process.env.NEXT_PUBLIC_ACADEMIC_BACKEND_API
const BaseStudentApi = process.env.NEXT_PUBLIC_STUDENT_BASE_API
const CommonBaseApiUrl = process.env.NEXT_PUBLIC_COMMON_BASE_API

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

export const commonAxiosConfig = {
  baseURL: CommonBaseApiUrl
}

export const apiEndPoints = Object.freeze({
  paymentList: '/payments/payment-details',
  admission: '/admissions/',
  academics: '/academics/',
  forgotPassword: 'user/forgot-password',
  updatePassword: 'user/update-password',
  logout: '/user/logout',
  login: '/user/login',
  userProfile: '/user/my-profile/',
  refreshToken: '/auth/refresh-token',
  studentApplication: '/user/student-application-details/',
  qualification: '/common/qualification',
  country: '/common/country',
  state: '/common/state',
  address: '/user/update-address/',
  studentSchedule: '/scheduler/',
  userDocument: '/user/documnents',
  uploadFileUrl: '/common/document/upload',
  getFileUrl: '/common/document',
  profilePhoto: '/user/upload-profile-picture/',
  document: '/common/document',
  resetPassword: 'user/reset-link',
  newPassword: 'user/update-new-password',
  documentType: 'common/document-type',
  allPrograms: '/programs/all',
  language: '/common/language',
  homelanguage: '/common/homelanguage',
  nationalityStatus: '/common/nationality-status',
  gender: '/common/gender',
  nationality: '/common/nationality',
  race: '/common/race',
  studentType: '/common/student-type',
  studyMode: '/common/study-mode',
  industry: '/common/employment-industry',
  downloadTranscript: '/academics/donwload/academic-records',
  currency: '/common/currency',
  query: '/query',
  queryType: '/common/query-type',
  queryStatus: '/common/query-status'
})
