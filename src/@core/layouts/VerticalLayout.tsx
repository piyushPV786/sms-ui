// ** React Imports
import { useState } from 'react'

import { EnvPaths } from 'src/context/common'

// ** MUI Imports
import Fab from '@mui/material/Fab'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icons Imports
import ArrowUp from 'mdi-material-ui/ArrowUp'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Components
import AppBar from './components/vertical/appBar'
import Customizer from 'src/@core/components/customizer'
import Navigation from './components/vertical/navigation'
import Footer from './components/shared-components/footer'
import ScrollToTop from 'src/@core/components/scroll-to-top'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { IconButton } from '@mui/material'
import Link from 'next/link'

const VerticalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex'
})

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const VerticalLayout = (props: LayoutProps) => {
  // ** Props
  const { hidden, settings, children, scrollToTop } = props

  // ** Vars
  const { skin, navHidden, contentWidth } = settings
  const { navigationSize, disableCustomizer, collapsedNavigationSize } = themeConfig
  const navWidth = navigationSize
  const navigationBorderWidth = skin === 'bordered' ? 1 : 0
  const collapsedNavWidth = collapsedNavigationSize

  // ** States
  const [navHover, setNavHover] = useState<boolean>(false)
  const [navVisible, setNavVisible] = useState<boolean>(false)

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible)

  return (
    <>
      <VerticalLayoutWrapper className='layout-wrapper'>
        {/* Navigation Menu */}
        {navHidden &&
        themeConfig.layout === 'vertical' &&
        !(navHidden && settings.lastLayout === 'horizontal') ? null : (
          <Navigation
            navWidth={navWidth}
            navHover={navHover}
            navVisible={navVisible}
            setNavHover={setNavHover}
            setNavVisible={setNavVisible}
            collapsedNavWidth={collapsedNavWidth}
            toggleNavVisibility={toggleNavVisibility}
            navigationBorderWidth={navigationBorderWidth}
            {...props}
          />
        )}
        <MainContentWrapper className='layout-content-wrapper'>
          {/* AppBar Component */}
          <AppBar
            collapsedNavWidth={collapsedNavWidth}
            navigationBorderWidth={navigationBorderWidth}
            navHover={navHover}
            toggleNavVisibility={toggleNavVisibility}
            {...props}
          />

          {/* Content */}
          <ContentWrapper
            className='layout-page-content'
            sx={{
              ...(contentWidth === 'boxed' && {
                mx: 'auto',
                '@media (min-width:1440px)': { maxWidth: 1440 },
                '@media (min-width:1200px)': { maxWidth: '100%' }
              })
            }}
          >
            {children}
          </ContentWrapper>
          <Box
            sx={{
              px: [4, 10],
              ...(contentWidth === 'boxed' && {
                mx: 'auto',
                '@media (min-width:1440px)': { maxWidth: 1440 },
                '@media (min-width:1200px)': { maxWidth: '100%' }
              }),
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Link href='https://regeniusuat.regenesys.net/login/index.php'>
              <a target='_blank'>
                <IconButton sx={{ backgroundColor: theme => theme.palette.primary.main }}>
                  <img src={`${EnvPaths.Base}/images/ticket.svg`} alt='Raise-Ticket' />
                </IconButton>
              </a>
            </Link>
          </Box>
          {/* Footer Component */}
          <Footer {...props} />

          {/* Portal for React Datepicker */}
          <DatePickerWrapper sx={{ zIndex: 11 }}>
            <Box id='react-datepicker-portal'></Box>
          </DatePickerWrapper>
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {/* Customizer */}
      {disableCustomizer || hidden ? null : <Customizer />}

      {/* Scroll to top button */}
      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <ArrowUp />
          </Fab>
        </ScrollToTop>
      )}
    </>
  )
}

export default VerticalLayout