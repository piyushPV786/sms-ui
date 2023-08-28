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
const userData = {
  id: 1,
  role: 'admin',
  password: 'admin',
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'admin@materialize.com'
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
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      const refreshToken = window.localStorage.getItem(authConfig.refreshToken)!
      const studentCode = window.localStorage.getItem(authConfig.studentCode)!
      if (storedToken && refreshToken && studentCode) {
        const userProfileResponse = await StudentService?.UserProfile(studentCode)
        if (userProfileResponse?.data?.data?.length) {
          const userInfo = userProfileResponse?.data?.data[0]
          await setUser({
            id: userInfo?.id,
            role: 'admin',
            password: '',
            fullName: `${userInfo?.firstName} ${userInfo?.lastName}`,
            username: userInfo?.username,
            email: userInfo?.email
          })
          setLoading(false)
        } else {
          window.localStorage.clear()
          setUser(null)
          setUser(userData)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const response = await StudentService?.Login(params)
    if (response?.data?.data?.tokens) {
      await window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data?.tokens?.access_token)
      await window.localStorage.setItem(authConfig.refreshToken, response.data.data?.tokens?.refresh_token)
      await window.localStorage.setItem(authConfig.studentCode, response.data.data?.studentCode)
      const userProfileResponse = await StudentService?.UserProfile(response.data.data?.studentCode)

      if (userProfileResponse?.data?.data?.length) {
        const userInfo = userProfileResponse?.data?.data[0]
        setUser({
          id: userInfo?.id,
          role: 'admin',
          password: '',
          fullName: `${userInfo?.firstName} ${userInfo?.lastName}`,
          username: userInfo?.username,
          email: userInfo?.email
        })
      }

      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL as string)
    } else {
      if (errorCallback) errorCallback(response?.data?.data?.message)
    }
  }

  const handleLogout = async () => {
    await StudentService?.logOut()
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('accessToken')
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
