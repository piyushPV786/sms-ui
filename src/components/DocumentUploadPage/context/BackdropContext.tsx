import React, { createContext, useContext, useState, ReactNode } from 'react'

type BackdropContextType = {
  open: boolean
  toggleBackdrop: (value: boolean) => void
}

const BackdropContext = createContext<BackdropContextType | undefined>(undefined)

export const useBackdrop = () => {
  const context = useContext(BackdropContext)
  if (context === undefined) {
    throw new Error('useBackdrop must be used within a BackdropProvider')
  }

  return context
}

type BackdropProviderProps = {
  children: ReactNode
}

export const BackdropProvider: React.FC<BackdropProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)

  const toggleBackdrop = (value: boolean) => {
    setOpen(value)
  }

  return <BackdropContext.Provider value={{ open, toggleBackdrop }}>{children}</BackdropContext.Provider>
}
