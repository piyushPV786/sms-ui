// ** React Imports
import { ReactNode } from 'react'


import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Typography, Box, Container, CssBaseline, Grid } from '@mui/material'
import SignUp from 'src/components/auth/login'



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
    <Box >
      <CssBaseline />
      <Container>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item xs={12}>
            <Typography variant='h3'>Welcome to Regenesys</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>Sign in by entering information below</Typography>
          </Grid>
          <Grid container  xs={12} justifyContent='center'>
            <Box>
              <Box >
                <img
                  src={`${process.env.BASE_URL}/images/login-icon.svg`}
                  alt='Login'
                  width='60px'
                  height='auto'
                  loading='lazy'
                />
              </Box>
              <Box >
                <SignUp onSubmit={onSubmit} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
