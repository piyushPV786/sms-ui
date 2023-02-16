import { useContext } from 'react'
import { AuthContext } from 'src/settings/context/AuthContext'

export const useAuth = () => useContext(AuthContext)
