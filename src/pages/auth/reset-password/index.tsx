// ** React Imports
import React, { ReactNode, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'

// ** MUI Components
import { Typography, Box, Container, CssBaseline, Grid, TextField, Button } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { CheckCircle, Circle } from 'mdi-material-ui'

const schema = yup.object().shape({
  password: yup.string().min(5).required(),
  confirmPassword: yup.string().min(5).required()
})
const defaultValues = {
  password: 'admin',
  email: 'admin@materialize.com'
}

const ForgetPassword = () => {
  const classes = useStyles()

  // ** Hooks
  const auth = useAuth()
  const [isShowValidationIcon, setIsShowValidationIcon] = useState(false)
  const [validationProps, setValidationProps] = useState({
    min8: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special_character: false
  })

  const { setError } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit = e => {
    const { password, confirmPassword } = e.target
    auth.resetPassword({ password, confirmPassword }, () => {
      setError('password', {
        type: 'manual',
        message: 'Password is invalid'
      })
    })
  }
  const updateValidationPropsValue = (name, value) => {
    setValidationProps(prev => ({ ...prev, [name]: value }))
  }

  const handleOnChangePassword = e => {
    const { value } = e.target
    setIsShowValidationIcon(value !== '')
    updateValidationPropsValue('password', value)
    updateValidationPropsValue('min8', min8Validation(value))
    updateValidationPropsValue('lowercase', lowercaseValidation(value))
    updateValidationPropsValue('uppercase', uppercaseValidation(value))
    updateValidationPropsValue('number', numberValidation(value))
    updateValidationPropsValue('special_character', specialCharacterValidation(value))
  }
  const ValidationIcon = ({ isValid }: { isValid: boolean }) => {
    return (
      <>
        {isShowValidationIcon &&
          (isValid ? <CheckCircle fontSize='small' color='primary' /> : <Circle fontSize='small' />)}
      </>
    )
  }

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Container>
        <Grid container spacing={2} justifyContent='center' className={classes.textCenter}>
          <Grid item xs={12}>
            <Typography variant='h3'>Reset your Password</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>Strong password include numbers, letters and punctuation marks</Typography>
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
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      onChange={handleOnChangePassword}
                      name='password'
                      label='Enter New Password'
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                  <Grid container style={{ paddingLeft: '1.25rem' }} textAlign='start' xs={12}>
                    <Grid item xs={6}>
                      <Typography variant='caption' alignItems='center'>
                        <ValidationIcon isValid={validationProps.min8} />
                        Min 8 characters.
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='caption'>
                        <ValidationIcon isValid={validationProps.uppercase} /> An uppercase A - Z.
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='caption'>
                        <ValidationIcon isValid={validationProps.lowercase} />A lowercase a - z.
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='caption'>
                        <ValidationIcon isValid={validationProps.number} />A number.
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='caption'>
                        <ValidationIcon isValid={validationProps.special_character} />A special character (!@#$%^&*().
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name='confirmPassword' label='Confirm New Password' variant='outlined' fullWidth />
                  </Grid>
                  <Grid container justifyContent='center' xs={12}>
                    <Button color='primary' variant='contained' onClick={onSubmit}>
                      Change Password
                    </Button>
                  </Grid>
                  <Grid container justifyContent='center' xs={12}>
                    <div style={{ cursor: 'pointer', marginTop: '10px' }}>
                      <Typography color='primary' variant='subtitle1'>
                        Forgot Password ?
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ForgetPassword

ForgetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ForgetPassword.guestGuard = true

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
const REGEX = {
  MIN8_REGEX: new RegExp('^(?=.{8,})'),
  LOWERCASE_REGEX: new RegExp('^(?=.*[a-z])'),
  UPPERCASE_REGEX: new RegExp('^(?=.*[A-Z])'),
  NUMBER_REGEX: new RegExp('^(?=.*[0-9])'),
  SPECIAL_CHARACTER_REGEX: new RegExp('^(?=.*[!@#$%^&*()])') //,
}
const min8Validation = value => REGEX.MIN8_REGEX.test(value)
const lowercaseValidation = value => REGEX.LOWERCASE_REGEX.test(value)
const uppercaseValidation = value => REGEX.UPPERCASE_REGEX.test(value)
const numberValidation = value => REGEX.NUMBER_REGEX.test(value)
const specialCharacterValidation = value => REGEX.SPECIAL_CHARACTER_REGEX.test(value)
