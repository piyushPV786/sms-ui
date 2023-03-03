// ** React Imports
import { ReactNode } from 'react'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Typography, Box, Container, CssBaseline, Grid, Card, CardContent, styled, BoxProps } from '@mui/material'
import SignUp from 'src/components/auth/login'
import { EnvPaths } from 'src/context/common'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@materialize.com'
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  // ** Hooks
  const auth = useAuth()

  // ** Vars

  const { setError } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    auth.login({ email, password }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

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
                  <SignUp onSubmit={onSubmit} />
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
