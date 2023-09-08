// ** React Imports
import React, { ReactNode, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

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
  FormHelperText
} from '@mui/material'
import { useRouter } from 'next/router'
import { EnvPaths, PathTypes, downloadSuccess, ErrorMessage, status } from 'src/context/common'
import { StudentService } from 'src/service'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { successToast } from '../../../@core/components/common/Toast'

const schema = yup.object().shape({
  email: yup.string().email(ErrorMessage.emailError).required()
})

const RequestLink = () => {
  const router = useRouter()
  const [email, setEmailValue] = useState<string>('')
  const [apiResponse, setApiResponse] = useState(null)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    console.log('data', data) //when api call remove console
    router.replace(PathTypes.resetpassword)
  }
  const handleChange = () => {
    router.replace(PathTypes.login)
  }

  return (
    <BackgroundBox>
      <Container>
        <Grid item xs={12}>
          <Typography variant='h3' color='white'>
            Forgot your Password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ p: 2 }} variant='h6' color='white'>
            Please enter the email-address you'd like your password reset information sent to
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
                  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <TextField
                          {...register('email')}
                          value={email}
                          onChange={e => {
                            setEmailValue(e.target.value)
                          }}
                          label='Email'
                          variant='outlined'
                          fullWidth
                        />
                        {errors.email && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                        )}
                        {apiResponse && <FormHelperText sx={{ color: 'error.main' }}>{apiResponse}</FormHelperText>}
                      </Grid>

                      <Grid item justifyContent='center' xs={12} sx={{ display: 'flex' }}>
                        <Button color='primary' type='submit' variant='contained'>
                          REQUEST RESET LINK
                        </Button>
                      </Grid>
                      <Grid container justifyContent='center' xs={12}>
                        <div
                          style={{
                            cursor: 'pointer',
                            marginTop: '10px'
                          }}
                        >
                          <Typography color='primary' variant='subtitle1' onClick={handleChange}>
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

export default RequestLink

RequestLink.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

RequestLink.guestGuard = true

const BackgroundBox = styled(Box)<BoxProps>(() => ({
  backgroundImage: `url('${EnvPaths.Base}/images/login-bg-Image.png')`,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  minHeight: '100vh'
}))
