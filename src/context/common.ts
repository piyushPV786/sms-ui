type LoginParams = {
  successCode: number
  successCodeOne: number
  approve: string
  reject: string
}

export const status: LoginParams = {
  successCode: 200,
  successCodeOne: 201,
  approve: 'APPROVED',
  reject: 'REJECT'
}

export enum PathTypes {
  login = '/auth/login',
  resetlink = '/auth/request-link',
  resetpassword = '/auth/reset-password'
}

export const EnvPaths = {
  Base: process.env.BASE_URL
}
