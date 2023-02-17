import '../styles/globals.css'
import { ReactNode } from 'react'
import type { AppProps } from 'next/app'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { NextPage } from 'next'
import { createEmotionCache } from 'src//@core/utils/create-emotion-cache'
import { SettingsConsumer, SettingsProvider } from 'src//@core/context/settingsContext'
import UserLayout from 'src//layouts/UserLayout'
import ThemeComponent from 'src//@core/theme/ThemeComponent'
import WindowWrapper from 'src//@core/components/window-wrapper'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import GuestGuard from 'src//@core/components/auth/GuestGuard'
import themeConfig from 'src//configs/themeConfig'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import AuthGuard from 'src//@core/components/auth/AuthGuard'

import Spinner from 'src//@core/components/spinner'
import AclGuard from 'src//@core/components/auth/AclGuard'
import { defaultACLObj } from 'src//configs/acl'
import { AuthProvider } from 'src//context/AuthContext'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}
const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}
export default function App(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout =
    Component.getLayout ??
    ((
      page:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactFragment
        | ReactPortal
        | null
        | undefined
    ) => <UserLayout>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultACLObj

  return (
    <AuthProvider>
      <CacheProvider value={emotionCache}>
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  <WindowWrapper>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
                        {getLayout(<Component {...pageProps} />)}
                      </AclGuard>
                    </Guard>
                  </WindowWrapper>
                </ThemeComponent>
              )
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </CacheProvider>
    </AuthProvider>
  )
}
