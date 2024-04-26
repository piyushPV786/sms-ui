export const ENROLMENT_BACKEND_API = process.env.NEXT_PUBLIC_ENROLMENT_BACKEND_API
export const NEXT_PUBLIC_ACADEMIC_BACKEND_API = process.env.NEXT_PUBLIC_ACADEMIC_BACKEND_API
export const BaseStudentApi = process.env.NEXT_PUBLIC_STUDENT_BASE_API
export const CommonBaseApiUrl = process.env.NEXT_PUBLIC_COMMON_BASE_API
export const OperationBaseApiUrl = process.env.NEXT_PUBLIC_OPERATION_BASE_URL
export const FinanceBaseApiUrl = process.env.NEXT_PUBLIC_FINANCE_BACKEND_API
export const APPLY_BACKEND_API = process.env.NEXT_PUBLIC_APPLY_BACKEND_API
export const DOCUMENT_BACKEND_API = process.env.NEXT_PUBLIC_DOCUMENT_BACKEND_API
export const USER_BACKEND_API = process.env.NEXT_PUBLIC_USER_MANAGEMENT_REDIRECT_URI

export const apiEndPoints = Object.freeze({
  paymentList: 'payments/payment-details',
  admission: 'admissions/',
  academics: 'academics/academic-record/',
  forgotPassword: 'user/forgot-password',
  updatePassword: 'user/update-password',
  logout: 'user/logout',
  login: 'user/login',
  userProfile: 'user/my-profile/',
  refreshToken: 'auth/refresh-token',
  studentApplication: 'user/student-application-details/',
  qualification: 'common/qualification',
  country: 'common/country',
  identificationType: 'common/identification-Type',
  state: 'common/state',
  address: 'user/update-address/',
  studentSchedule: 'scheduler/detail/',
  userDocument: 'user/documnents',
  uploadFileUrl: 'common/document/upload',
  getFileUrl: 'common/document',
  profilePhoto: 'user/upload-profile-picture/',
  document: 'common/document',
  resetPassword: 'user/reset-link',
  newPassword: 'user/update-new-password',
  documentType: 'common/document-type',
  allPrograms: 'programs/all',
  language: 'common/language',
  homelanguage: 'common/homelanguage',
  nationalityStatus: 'common/nationality-status',
  gender: 'common/gender',
  nationality: 'common/nationality',
  race: 'common/race',
  studentType: 'common/student-type',
  studyMode: 'common/study-mode',
  industry: 'common/employment-industry',
  downloadTranscript: 'academics/donwload/academic-records',
  currency: 'common/currency',
  query: 'query',
  queryType: 'common/query-type',
  queryStatus: 'common/query-status',
  offlinePayment: 'payments',
  attendance: 'attendance',
  courseList: 'class-management/course-list',
  courses: 'courses',
  ukheshePyment: 'payments/ukheshe-payment',
  ukhesheToken: 'payments/get-ukheshe-token',
  examTicket: 'academics/exam-ticket',
  rollover: 'rollover',
  feeConversionRate: 'programs-fee/fee-conversion-rate',
  status: 'common/set-status',
  class: 'class-management/class-data',
  courselist: 'class-management/course-list',
  facilitator: 'facilitator',
  allProgram: 'programs/all',
  program: 'programs',
  courseFilter: 'courses/all-courses',
  enrollElective: 'academics/enroll-elective',
  getElective: 'academics/all-academic-records',
  applicationDetails: 'lead/:leadCode/application/:applicationCode',
  multipleApplication: 'application/multiple-applicaton',
  getStudentDetail: 'application/student-details/:studentCode',
  getLeadDetails: 'lead/:leadCode/application',
  studentProgram: 'programs-fee/byProgramCode/:programCode',
  programDetail: 'programs/:programCode',
  programRmat: 'rmat/byProgramCode/:programCode',
  enrolmentApplicationDetails: 'admissions/:applicationCode',
  application: 'application',
  commonDocuments: 'common/document-type',
  bursary: 'bursary',
  documentCode: 'common/next-code/DOC',
  declarationForm: 'download/declarationForm',
  payu: '/payment/payu',
  rmat: 'application/rmat/details/:studentCode',
  studyModeByCode: 'programs-fee/byProgramCode',
  user: 'user',
  studentData: 'application/:ProgCode/:studentCode'
})
