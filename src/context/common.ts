import { ThemeColor } from 'src/@core/layouts/types'

type IStatusParams = {
  successCode: number
  successCodeOne: number
  unauthorizedStatus: number
  approve: string
  reject: string
  errorCode: number
}

export const status: IStatusParams = {
  successCode: 200,
  successCodeOne: 201,
  unauthorizedStatus: 401,
  approve: 'APPROVED',
  reject: 'REJECT',
  errorCode: 400
}

export enum PathTypes {
  login = '/auth/login',
  resetlink = '/auth/request-link',
  resetpassword = '/auth/reset-password',
  document = '/pages/my-document'
}

export const EnvPaths = {
  Base: process.env.NEXT_PUBLIC_STUDENT_BASE_URL
}

interface deleteDocument {
  delete: string
}

interface EnrollElective {
  enroll: string
}

export const deleteDocument: deleteDocument = {
  delete: 'File deleted Sucessfully.'
}

interface downloadSuccess {
  download: string
  upload: string
  searchErrorMessage: string
  passwordReset: string
  passwordUpdate: string
  academicDownload: string
  studentCodeError: string
  queryCreated: string
}

export const downloadSuccess: downloadSuccess = {
  download: 'File downloaded successfully.',
  upload: 'File uploaded successfully.',
  searchErrorMessage: 'Type minimum 3 characters',
  passwordReset: 'Password reset request was sent successfully. Please check your email to reset your password.',
  passwordUpdate: 'Password update successfully',
  academicDownload: 'Academic Transcripts downloaded successfully.',
  studentCodeError: 'Student code does not exist in academic record',
  queryCreated: 'Your request was successfully submitted.'
}

interface IDynamicEmailObject {
  [key: string]: any
}

export const LoginEmailStatusTypes: IDynamicEmailObject = {
  'Incorrect email address.': 'Email address is not associated with Regenesys account'
}

interface FileTypes {
  doc: string
  ppt: string
  pdf: string
  png: string
}

export const fileType: FileTypes = {
  doc: 'DOC',
  ppt: 'PPT',
  pdf: 'pdf',
  png: 'png'
}

export const info = [
  {
    title: 'Student Number',
    description: 'REG12536253'
  },
  {
    title: 'Full Name',
    description: 'Student Number'
  },
  {
    title: 'ID Number',
    description: '128918291829812'
  },
  {
    title: 'Date Of Birth',
    description: '25-08-1986'
  },
  {
    title: 'Qualification',
    description: 'Master of Business Administration'
  },
  {
    title: 'NQF Level',
    description: '5'
  },
  {
    title: 'Date of Registration',
    description: '09 February 2022'
  },
  {
    title: 'Status',
    description: 'Qualification in Progress'
  },
  {
    title: 'Graduation Date',
    description: '-'
  }
]

interface IDynamicObject {
  [key: string]: any
}

export const projectStudentDocumentMessage: IDynamicObject = {
  'file-invalid-type': 'Only PNG, JPEG and PDF files are Allowed',
  'file-too-large': 'File is larger than 2 MB'
}

export enum FileSize {
  maxSize = 2000 * 1024
}

export interface ICommonData {
  id: number
  code: string
  name: string
}
export interface ICourses {
  id: number
  name: string
  code: string
  program: ICommonData
}
export interface ISchedule {
  scheduleDates: any
  find: any
  map(arg0: (duration: any) => any): unknown
  scheduleDuration: unknown
  id: number
  individualAssignmentDueDate: Date
  course: ICourses
  code: any
  programSchedule: any
}
export interface IScheduleData {
  id: number
  courseSchedule: ISchedule[]
}

export interface IScheduleCodeType {
  code: string
}
export const PaymentTypes = [
  {
    registerName: 'paymentType',
    name: 'Ukheshe',
    value: 'ukheshe',
    label: 'Online'
  },
  {
    registerName: 'paymentType',
    name: 'Offline',
    value: 'offline',
    label: 'Upload Payment Proof'
  }
]
export enum ApplyForProgram {
  qualification = 'Qualification is required',
  studyMode = 'StudyMode is required'
}
export enum ErrorMessage {
  emailRequired = 'Email is required',
  emailError = 'Please enter a valid email address',
  emailRegenesysError = 'Email address is not associated with Regenesys account',
  newPassword = 'Please Type your password',
  newPasswordError = 'Please enter a password that meets all of the requirements below',
  confirmPassword = 'Please Type again your new password',
  confirmPasswordError = `Those password didn't match. Try again`,
  Error = 'Something went wrong',
  stateError = 'This state not exist in the country ',
  zipCodeRequired = 'ZipCode is required',
  zipCodeError = 'ZipCode must be number',
  zipCodeMinError = 'ZipCode must be atleast 3 digits',
  zipCodeMaxError = 'ZipCode must only be 10 digits',
  userNameRequired = 'User Name is required'
}
export interface IOnSubmit {
  qualification: string
  qualificationName: string
  studyMode: string
}
export interface ISumbitPayload {
  studentCode: string
  education: {
    programCode: string
    programName: string
    studyModeCode: string
    qualificationCode: null
    socialMediaCode: null
    applicationFees: null
    programFees: null
    programMode: null
    agentCode: string
    highSchoolName: null
    studentTypeCode: string
    referredById: null
    isInternationDegree: number
    bursaryName: null
    bursaryId: null
  }
}

export enum ProfilePhoto {
  Upload = 'Profile photo updated Successfully.'
}

interface IAttendanceStatusType {
  [key: string]: any
}

export const AttendanceStatusObj: IAttendanceStatusType = {
  Attended: 'success',
  Skipped: 'error',
  Upcoming: 'warning'
}

export const ClassResponse = {
  count: 1,
  data: [
    {
      id: 1,
      Date: '15 feb 2023',
      Day: 'Monday',
      from: '10:30',
      to: '12:30',
      totalClass: '360',
      totalAttend: '180',
      percent: '100%',
      Facilitator: 'Dr Kumlo',
      Venue: 'Auckland park',
      Status: 'Attended'
    }
  ]
}

export const documentResponse = {
  count: 1,
  data: [
    {
      id: 1,
      code: 'MBA-HRM-507',
      name: 'Business Reasearch',
      class: 360,
      attendance: 180,
      percent: '100%',
      Status: 'Upcoming'
    }
  ]
}

export const options = ['1st Semester', '2nd Semester']

interface IraiseQueryMessageTypes {
  subject: string
  category: string
  description: string
}

export const raiseQueryMessage: IraiseQueryMessageTypes = {
  subject: 'Subject is Required',
  category: 'Category is Required',
  description: 'Description is Required'
}

export const FileType = ['image/png', 'image/pdf', 'image/jpeg']

export enum FileError {
  fileSizeError = 'File is larger than 500 KB',
  fileTypeError = 'File type must be png, jpeg and pdf'
}
export const feeStatus = {
  PROG_FEE_ACCEPTED: 'PROG-FEE-ACCEPTED'
}

export enum QueryDocumentCode {
  code = 'QUERYDOC'
}

export interface IIntakeStatusType {
  [key: string]: ThemeColor
}

export const IntakeStatus = {
  notStarted: 'NOT_STARTED',
  beingActioned: 'BEING_ACTIONED',
  resolved: 'RESOLVED',
  escalated: 'ESCALATED'
}

export enum QueryLimit {
  Subject = 100,
  Description = 200
}

export enum QueryFileSize {
  maxSize = 500 * 1024 // 500KB
}

export enum paymentType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export interface IRow {
  id: number | null
  classDate: null | string
  courseCode: string
  courseName: null | string
  scheduleCode: string
  status: string
  totalAttend: number | string
  totalClass: number | string
  to: null | number | string
  from: null | number | string
  percentage: null | number | string
  venue: null | string
  facilitator: null | string
}

export const EnrollElective: EnrollElective = {
  enroll: 'Elective modules were successfully enrolled for the first year.'
}

export interface ICourseDetails {
  id: number
  programId: number
  code: string
  name: string
  type: string
  assignments: number
  assessment: number
  examination: number
  isActive: boolean
  academicYearOfProgram: string
  dependentCourseCode: string
  programSemester: { name: string }
  validThroughAcademicYearofStudy: string
  credit: number
  course: {
    name: string
    type: string
    academicYearOfProgram: string
  }
}

export enum GoogleAnalyticsScript {
  script1 = 'https://regenesys-rms.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/tod1zk/b/5/c95134bc67d3a521bb3f4331beb9b804/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=236dc7e1',
  script2 = 'https://regenesys-rms.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/tod1zk/b/5/b0105d975e9e59f24a3230a22972a71a/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=236dc7e1',
  prodURL = 'https://rms.regenesys.net/'
}

export const documentCriteria = [
  {
    text: `File accepted: JPEG/JPG/PNG, PDF (Max size: 2MB)`,
    isInnerText: true
  },
  {
    text: `ID should be at least valid for 6 months`,
    isInnerText: true
  },
  { text: 'Upload a color scan of the original document.' }
]
