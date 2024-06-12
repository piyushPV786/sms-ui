// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'
import authConfig from 'src/configs/auth'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import { AuthValuesType, ErrCallbackType, LoginParams, UserDataType } from './types'
import { StudentService } from 'src/service'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setIsInitialized(true)
      const storedToken = window.sessionStorage.getItem(authConfig.storageTokenKeyName)!
      const refreshToken = window.sessionStorage.getItem(authConfig.refreshToken)!
      const studentCode = window.sessionStorage.getItem(authConfig.studentCode)!
      if (storedToken && refreshToken && studentCode) {
        const userProfileResponse = await StudentService?.UserProfile(studentCode)

        if (userProfileResponse?.data?.data) {
          const userInfo = userProfileResponse?.data?.data

          await setUser({
            id: userInfo?.id,
            role: 'admin',
            password: '',
            fullName: `${userInfo?.firstName} ${userInfo?.lastName}`,
            username: userInfo?.username,
            email: userInfo?.email,
            studentCode: userInfo?.studentCode
          })
          setLoading(false)
        } else {
          window.sessionStorage.clear()
          setUser(null)
          setLoading(false)
          const returnUrl = router.query.returnUrl
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL as string)
        }
      } else {
        setLoading(false)
        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      }
    }
    initAuth()
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    try {
      const response = await StudentService?.Login(params)
      if (response?.data?.data?.tokens) {
        await window.sessionStorage.setItem(authConfig.storageTokenKeyName, response.data.data?.tokens?.access_token)
        await window.sessionStorage.setItem(authConfig.refreshToken, response.data.data?.tokens?.refresh_token)
        await window.sessionStorage.setItem(authConfig.studentCode, response.data.data?.studentCode)

        const userProfileResponse = await StudentService?.UserProfile(response.data.data?.studentCode)

        if (userProfileResponse?.data?.data) {
          const userInfo = userProfileResponse?.data?.data
          const data = {
            id: userInfo?.id,
            role: 'admin',
            password: '',
            fullName: `${userInfo?.firstName} ${userInfo?.lastName}`,
            username: userInfo?.username,
            email: userInfo?.email,
            studentCode: userInfo?.studentCode
          }
          await window.sessionStorage.setItem('userData', JSON.stringify(data))
          setUser(data)
        }

        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      } else {
        if (errorCallback) errorCallback(response?.data?.data?.message)
      }
    } catch (err: any) {
      if (errorCallback) errorCallback(err)
    }
  }

  const handleLogout = async () => {
    await StudentService?.logOut()
    setUser(null)
    setIsInitialized(false)
    window.sessionStorage.removeItem('userData')
    window.sessionStorage.removeItem('accessToken')
    router.push('/auth/login')
  }
  const handleRegister = () => {
    return ''
  }
  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
