export enum PathTypes {
  login = '/auth/login',
  resetlink = '/auth/request-link',
  resetpassword = '/auth/reset-password'
}

export const EnvPaths = {
  Base: process.env.BASE_URL
}
