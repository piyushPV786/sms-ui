import { useContext } from 'react'
import { SettingsContext, SettingsContextValue } from 'src/settings/@core/context/settingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
