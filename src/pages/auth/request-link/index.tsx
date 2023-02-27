// ** React Imports
import React, { ReactNode } from 'react'
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
  TextField
} from '@mui/material'
import { useRouter } from 'next/router'

const RequestLink = () => {
  const router = useRouter()
  const onSubmit = () => {
    router.replace('/auth/reset-password')
  }
  const handleChange = () => {
    router.replace('/auth/login')
  }

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
                    src={`${process.env.BASE_URL}/images/login-icon.svg`}
                    alt='Login'
                    width='60px'
                    height='auto'
                    loading='lazy'
                  />
                </LogoBox>
                <Box>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField label='Email' variant='outlined' fullWidth />
                    </Grid>

                    <Grid item justifyContent='center' xs={12} sx={{ display: 'flex' }}>
                      <Button color='primary' type='submit' variant='contained' onClick={onSubmit}>
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
  backgroundImage: `url('${process.env.BASE_URL}/images/login-bg-Image.png')`,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  minHeight: '100vh'
}))
