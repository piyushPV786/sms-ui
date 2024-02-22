// ** React Imports
import { ReactNode, useEffect } from 'react'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Typography, Box, Container, CssBaseline, Grid, Card, CardContent, styled, BoxProps } from '@mui/material'
import SignUp from 'src/components/auth/login'
import { EnvPaths, GoogleAnalyticsScript } from 'src/context/common'
import { checkProd } from 'src/utils'

const LoginPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GoogleAnalyticsScript.script2)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const scriptContent = await response.text()
        const scriptElement = document.createElement('script')
        scriptElement.innerHTML = scriptContent
        document.body.appendChild(scriptElement)
      } catch (error) {
        console.error('There was a problem fetching the data:', error)
      }
    }
    checkProd() && fetchData()
  }, [])

  return (
    <BackgroundBox className='text-center'>
      <Container>
        <Grid item xs={12}>
          <Typography variant='h3' color='white'>
            Welcome to Regenesys
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ p: 2 }} variant='h6' color='white'>
            Sign in by entering information below
          </Typography>
        </Grid>
      </Container>
      <Container>
        <CssBaseline />
        <Grid container spacing={2} justifyContent='center'>
          <Grid container xs={12} justifyContent='center'>
            <Card sx={{ maxWidth: { xs: '320px', md: '450px' }, position: 'relative', overflow: 'visible' }}>
              <CardContent sx={{ p: 12 }}>
                <LogoBox>
                  <img
                    src={`${EnvPaths.Base}/images/login-icon.svg`}
                    alt='Login'
                    width='60px'
                    height='auto'
                    loading='lazy'
                  />
                </LogoBox>
                <Box>
                  <SignUp />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </BackgroundBox>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage

const LogoBox = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: '100%',
  position: 'absolute',
  top: '-52px',
  left: '37%',
  width: '120px',
  height: '120px',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '24px',
  alignItems: 'start',
  background: theme.palette.common.white
}))
const BackgroundBox = styled(Box)<BoxProps>(() => ({
  backgroundImage: `url('${EnvPaths.Base}/images/login-bg-Image.png')`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  height: '100vh'
}))
