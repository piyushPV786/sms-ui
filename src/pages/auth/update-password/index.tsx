// ** React Imports
import React, { ReactNode, useEffect, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** MUI Components
import {
  Typography,
  Box,
  Container,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  styled,
  BoxProps,
  Button,
  TextField,
  Snackbar,
  Alert
} from '@mui/material'
import { CheckCircle, Circle } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { EnvPaths, PathTypes } from 'src/context/common'

const schema = yup.object().shape({
  tempPassword: yup.string().required('Please Type your temporary password'),
  password: yup.string().required('Please Type your password'),
  confirmPassword: yup
    .string()
    .required('Please Type again your new password')
    .oneOf([yup.ref('password')], `Those Password didn't match. Try again`)
})

const ForgetPassword = () => {
  // ** Vars

  const [open, setOpen] = useState<boolean>(false)
  const [validationProps, setValidationProps] = useState({
    min8: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special_character: false
  })
  const {
    setError,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const router = useRouter()

  // ** Functions

  const onHandle = () => {
    router.replace(PathTypes.login)
  }

  const checkRequirements = () => {
    setError('password', {
      type: 'manual',
      message: Object.values(validationProps).includes(false)
        ? 'Please enter a password that meets all of the requirements below'
        : ''
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => checkRequirements, [validationProps])

  const onSubmit = () => {
    checkRequirements()
    setOpen(true)

    //  Call API
  }
  const updateValidationPropsValue = (name: string, value: boolean) => {
    setValidationProps(prev => ({ ...prev, [name]: value }))
  }
  const handleOnChangePassword = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement
    updateValidationPropsValue('min8', min8Validation(value))
    updateValidationPropsValue('lowercase', lowercaseValidation(value))
    updateValidationPropsValue('uppercase', uppercaseValidation(value))
    updateValidationPropsValue('number', numberValidation(value))
    updateValidationPropsValue('special_character', specialCharacterValidation(value))
  }
  const ValidationIcon = ({ isValid }: { isValid: boolean }) =>
    isValid ? (
      <CheckCircle style={{ paddingRight: 5 }} fontSize='small' color='primary' />
    ) : (
      <Circle style={{ paddingRight: 5 }} fontSize='small' />
    )

  return (
    <BackgroundBox>
      <Container>
        <Grid item xs={12}>
          <Typography variant='h3' color='white'>
            Reset your Password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ p: 2 }} variant='h6' color='white'>
            Strong password include numbers, letters and punctuation marks
          </Typography>
        </Grid>
      </Container>
      <Container>
        <CssBaseline />
        <Grid container spacing={2} justifyContent='center'>
          <Grid container xs={12} justifyContent='center'>
            <Card
              sx={{
                maxWidth: { xs: '320px', md: '450px' },
                position: 'relative',
                overflow: 'visible'
              }}
            >
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <TextField
                          {...register('tempPassword')}
                          label='Enter temporary password'
                          variant='outlined'
                          type='password'
                          fullWidth
                          error={!!errors?.tempPassword?.message}
                          helperText={errors?.tempPassword?.message}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          {...register('password')}
                          onChange={handleOnChangePassword}
                          label='Enter New Password'
                          variant='outlined'
                          type='password'
                          fullWidth
                          error={!!errors?.password?.message}
                          helperText={errors?.password?.message}
                        />
                      </Grid>
                      <Grid container spacing={2} style={{ paddingTop: 20, paddingLeft: 20 }} textAlign='start' xs={12}>
                        <Grid item xs={6}>
                          <Typography variant='caption' display='flex' alignItems='center'>
                            <ValidationIcon isValid={validationProps.min8} />8 characters minimum
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant='caption' display='flex' alignItems='center'>
                            <ValidationIcon isValid={validationProps.uppercase} /> 1 uppercase letter
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant='caption' display='flex' alignItems='center'>
                            <ValidationIcon isValid={validationProps.lowercase} />1 lowercase letter
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant='caption' display='flex' alignItems='center'>
                            <ValidationIcon isValid={validationProps.number} />1 number
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant='caption' display='flex' alignItems='center'>
                            <ValidationIcon isValid={validationProps.special_character} />1 special character
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          {...register('confirmPassword')}
                          label='Confirm New Password'
                          variant='outlined'
                          type='password'
                          fullWidth
                          error={!!errors?.confirmPassword?.message}
                          helperText={errors?.confirmPassword?.message}
                        />
                      </Grid>
                      <Grid item justifyContent='center' xs={12} sx={{ display: 'flex' }}>
                        <Button color='primary' type='submit' variant='contained' onClick={onSubmit}>
                          Change Password
                        </Button>
                      </Grid>
                      <Grid container justifyContent='center' xs={12}>
                        <div
                          style={{
                            cursor: 'pointer',
                            marginTop: '10px'
                          }}
                        >
                          <Typography color='primary' variant='subtitle1' onClick={onHandle}>
                            Back to Login
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity='success' sx={{ width: '100%' }}>
          You have sucessfully updated your password.{' '}
        </Alert>
      </Snackbar>
    </BackgroundBox>
  )
}

export default ForgetPassword

ForgetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ForgetPassword.guestGuard = true

const REGEX = {
  MIN8_REGEX: new RegExp('^(?=.{8,})'),
  LOWERCASE_REGEX: new RegExp('^(?=.*[a-z])'),
  UPPERCASE_REGEX: new RegExp('^(?=.*[A-Z])'),
  NUMBER_REGEX: new RegExp('^(?=.*[0-9])'),
  SPECIAL_CHARACTER_REGEX: new RegExp('^(?=.*[!@#$%^&*()])') //,
}
const min8Validation = (value: string) => REGEX.MIN8_REGEX.test(value)
const lowercaseValidation = (value: string) => REGEX.LOWERCASE_REGEX.test(value)
const uppercaseValidation = (value: string) => REGEX.UPPERCASE_REGEX.test(value)
const numberValidation = (value: string) => REGEX.NUMBER_REGEX.test(value)
const specialCharacterValidation = (value: string) => REGEX.SPECIAL_CHARACTER_REGEX.test(value)

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
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  minHeight: '100vh'
}))
