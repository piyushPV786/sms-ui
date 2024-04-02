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
  InputAdornment,
  IconButton
} from '@mui/material'
import { CheckCircle, Circle, EyeOffOutline, EyeOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { EnvPaths, ErrorMessage, PathTypes, downloadSuccess, status } from 'src/context/common'
import { StudentService } from 'src/service'
import { INewPassword } from 'src/service/Student'
import { errorToast, successToastBottomRight } from 'src/components/common'

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required(ErrorMessage.newPassword)
    .matches(
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
      ErrorMessage.newPasswordError
    ),
  confirmPassword: yup
    .string()
    .required(ErrorMessage.confirmPassword)
    .oneOf([yup.ref('newPassword')], ErrorMessage.confirmPasswordError)
})

const ForgetPassword = () => {
  // ** Vars
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [validationProps, setValidationProps] = useState({
    min8: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special_character: false
  })
  const {
    handleSubmit,
    register,
    watch,

    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const { token } = router.query

  const onHandle = () => {
    router.replace(PathTypes.login)
  }

  const updateNewPassword = async (payload: INewPassword) => {
    const newPayload = {
      ...payload,
      token
    }
    const response = await StudentService?.userNewPassword(newPayload)
    if (response?.status === status?.successCode) {
      successToastBottomRight(downloadSuccess.passwordUpdate)
      router.replace(PathTypes.login)
    } else {
      errorToast(ErrorMessage.Error)
    }
  }
  const onSubmit = (data: any) => {
    if (Object.keys(errors).length === 0 && !Object.values(validationProps).includes(false)) {
      updateNewPassword(data)
    }
  }

  const updateValidationPropsValue = (name: string, value: boolean) => {
    setValidationProps(prev => ({ ...prev, [name]: value }))
  }
  const handleOnChangePassword = (value: string) => {
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

  useEffect(() => {
    handleOnChangePassword(watch('newPassword'))
  }, [watch('newPassword')])

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
                          {...register('newPassword')}
                          label='Enter New Password'
                          variant='outlined'
                          fullWidth
                          type={showNewPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                  {showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          error={!!errors?.newPassword?.message}
                          helperText={`${errors?.newPassword?.message}`}
                        />
                      </Grid>
                      {!!watch('newPassword') && (
                        <Grid
                          container
                          spacing={2}
                          style={{ paddingTop: 20, paddingLeft: 20 }}
                          textAlign='start'
                          xs={12}
                        >
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
                      )}

                      <Grid item xs={12}>
                        <TextField
                          {...register('confirmPassword')}
                          label='Confirm New Password'
                          variant='outlined'
                          type={showConfirmPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onMouseDown={e => e.preventDefault()}
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          fullWidth
                          error={!!errors?.confirmPassword?.message}
                          helperText={`${errors?.confirmPassword?.message}`}
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
