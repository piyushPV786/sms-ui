// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import { AvatarProps, Divider, Typography } from '@mui/material'
import Link from 'next/link'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getUserInfo } from 'src/utils'
import { HelpBox, InformationOutline, React } from 'mdi-material-ui'
import WhiteButton from '../Button'
import { useRouter } from 'next/router'
import ExamTicket from '../dialog/ExamTicket'

// Styled CardContent component
const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(7, 7.5)} !important`,
  backgroundColor: 'rgb(80,149,142)',
  background: 'linear-gradient(90deg, rgba(80,149,142,1) 0%, rgba(1,133,85,1) 100%)',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '0 !important'
  }
}))

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<AvatarProps>(({ theme }) => ({
  width: 150,
  height: 150,
  marginRight: theme.spacing(4)
}))

const StudentDetails = ({ profileImage }: any) => {
  const router = useRouter()
  const handlePay = () => {
    router.push('/payment/checkout')
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={2} md={3} sm={4}>
            <Box>
              <Avatar alt='R' src={profileImage} />
            </Box>
          </Grid>
          <Grid item xs={7} md={5} sm={5}>
            <Box ml={5}>
              <Typography mb={4} variant='h5' fontWeight={400} sx={{ color: '#fff' }}>
                Hi {getUserInfo()?.fullName}
              </Typography>
              <Typography mb={6} variant='h6' sx={{ color: '#fff' }}>
                Welcome back to Regenesys, Lets Start Learning
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
                <Link href={`/myProfile`} passHref>
                  <a href='' style={{ color: '#fff' }}>
                    My Profile
                  </a>
                </Link>

                <Divider orientation='vertical' sx={{ bgcolor: '#fff' }} flexItem />
                <Link href={`/calendar`} passHref>
                  <a href='' style={{ color: '#fff' }}>
                    Calender
                  </a>
                </Link>
                <Divider orientation='vertical' sx={{ bgcolor: '#fff' }} flexItem />
                <Link href={`/my-document`} passHref>
                  <a href='' style={{ color: '#fff' }}>
                    My Documents
                  </a>
                </Link>
                <Divider orientation='vertical' sx={{ bgcolor: '#fff' }} flexItem />

                <Link href={`/query`} passHref>
                  <a href='' style={{ color: '#fff' }}>
                    <Box display='flex'>
                      <Box display='contents'>
                        <HelpBox />
                      </Box>
                      <Box pl={1}>My Queries</Box>
                    </Box>
                  </a>
                </Link>

                <a href='#' style={{ color: '#fff' }}>
                  <ExamTicket />
                </a>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={3} md={4} sm={3} pt={2} pr={2}>
            <Card sx={{ background: theme => `${theme.spacing(6, 7.5)} !important` }}>
              <Grid
                width='100%'
                sx={{
                  display: 'flex',
                  borderRadius: '2px',
                  padding: 3,
                  background: `#026b45 !important`,
                  color: theme => theme.palette.primary.main
                }}
              >
                <Grid p={2} display='flex' alignItems='center'>
                  <InformationOutline color='warning' fontSize='large' />
                </Grid>
                <Grid p={2}>
                  <Typography color={theme => theme.palette.warning.main} fontSize='large'>
                    To Rollover
                  </Typography>
                  <Typography color={theme => theme.palette.common.white} fontSize={15} pb={2}>
                    You have passed the dependent modules. Please pay the 500 and admission fee to roll over next
                    semester.
                  </Typography>
                  <WhiteButton onClick={handlePay}>Pay</WhiteButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StudentDetails
