type IStatusParams = {
  successCode: number
  successCodeOne: number
  unauthorizedStatus: number
  approve: string
  reject: string
}

export const status: IStatusParams = {
  successCode: 200,
  successCodeOne: 201,
  unauthorizedStatus: 401,
  approve: 'APPROVED',
  reject: 'REJECT'
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

export const deleteDocument: deleteDocument = {
  delete: 'File deleted Sucessfully.'
}

interface downloadSuccess {
  download: string
  upload: string
  searchErrorMessage: string
}

export const downloadSuccess: downloadSuccess = {
  download: 'File downloaded Sucessfully.',
  upload: 'File uploaded Sucessfully.',
  searchErrorMessage: 'Type minimum 3 characters'
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
