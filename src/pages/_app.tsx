import '../styles/globals.css'
import { ReactNode } from 'react'
import type { AppProps } from 'next/app'
// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { NextPage } from 'next'
import { createEmotionCache } from 'src/settings/@core/utils/create-emotion-cache'
import { SettingsConsumer, SettingsProvider } from 'src/settings/@core/context/settingsContext'
import UserLayout from 'src/settings/layouts/UserLayout'
import ThemeComponent from 'src/settings/@core/theme/ThemeComponent'
import WindowWrapper from 'src/settings/@core/components/window-wrapper'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import GuestGuard from 'src/settings/@core/components/auth/GuestGuard'
import themeConfig from 'src/settings/configs/themeConfig'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import AuthGuard from 'src/settings/@core/components/auth/AuthGuard'

import Spinner from 'src/settings/@core/components/spinner'
import AclGuard from 'src/settings/@core/components/auth/AclGuard'
import { defaultACLObj } from 'src/settings/configs/acl'
import { AuthProvider } from 'src/settings/context/AuthContext'

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
