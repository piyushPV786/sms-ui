// ** React Imports
import { ReactNode, useState } from 'react'
import SignUp from 'src/auth/login/signUp'
import ForgetPassword from 'src/auth/login/forgetPassword'

// ** MUI Components
import { Box, Container, CssBaseline, Grid, Typography, makeStyles } from '@material-ui/core'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${process.env.BASE_URL}/images/login-bg-Image.png)`,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center'
  },
  textCenter: {
    textAlign: 'center',
    color: 'white'
  },
  formContainer: {
    marginTop: '80px'
  },
  formArea: {
    width: '320px',
    [theme.breakpoints.up('md')]: {
      width: '450px'
    },
    padding: '30px',
    borderRadius: '20px',
    background: 'white',
    position: 'relative'
  },
  logoContainer: {
    background: 'white',
    borderRadius: '100%',
    padding: '30px 40px 50px',
    position: 'absolute',
    top: '-50px',
    left: '36%'
  },
  formFields: {
    paddingTop: '30px'
  }
}))

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
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false)
  const classes = useStyles()

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
    <Box className={classes.root}>
      <CssBaseline />
      <Container>
        <Grid container spacing={2} justifyContent='center' className={classes.textCenter}>
          <Grid item xs={12}>
            <Typography variant='h3'>Welcome to Regenesys</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>Sign in by entering information below</Typography>
          </Grid>
          <Grid container className={classes.formContainer} xs={12} justifyContent='center'>
            <Box className={classes.formArea}>
              <Box className={classes.logoContainer}>
                <img
                  src={`${process.env.BASE_URL}/images/login-icon.svg`}
                  alt='Login'
                  width='60px'
                  height='auto'
                  loading='lazy'
                />
              </Box>
              <Box className={classes.formFields}>
                {isForgotPassword ? (
                  <ForgetPassword setIsForgotPassword={setIsForgotPassword} />
                ) : (
                  <SignUp onSubmit={onSubmit} setIsForgotPassword={setIsForgotPassword} />
                )}
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
