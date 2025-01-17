export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  username: string
  password: string
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
  studentCode: string
}

export type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: UserDataType | null
  setUser: (value: UserDataType | null) => void
  setIsInitialized: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}

export type AppBarSearchType = {
  id: number
  url: string
  icon: string
  title: string
  category: string
}

export interface IDocumentTypes {
  id: number
  name: string
  type: string
  size: string
  datetime: string
}

export interface IDocumentType {
  code: string
  createdAt: string
  documentTypeCode: string
  fileExtension: string
  id: number
  name: string
  status: string
  studentCode: string
  fileSize: string
}

export interface IUploadDocumentParam {
  file: File & { isNewlyAdded?: boolean }
  fileType: string
}

export interface IProgramList {
  code: string
  id: number
  isActive?: boolean
  name: string
}

export interface ICourseList {
  code: string
  id: number
  name: string
}
