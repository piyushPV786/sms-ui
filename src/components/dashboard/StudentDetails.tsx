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
import { HelpBox, InformationOutline } from 'mdi-material-ui'
import ExamTicket from '../dialog/ExamTicket'
import SelectElective from '../dialog/SelectElective'

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

const StudentDetails = ({
  profileImage,
  studentDetails,
  module,
  electiveModule,
  getElectiveModuleList,

}: any) => {


  const electiveRollover = true

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={2} md={3} sm={4}>
            <Box>
              <Avatar alt={`${getUserInfo()?.fullName}`} src={profileImage} />
            </Box>
          </Grid>
          <Grid item xs={7} md={5} sm={5}>
            <Box ml={5}>
              <Typography mb={4} variant='h5' fontWeight={400} sx={{ color: '#fff' }}>
                Hi {`${studentDetails?.firstName} ${studentDetails?.lastName}`}
              </Typography>
              <Typography mb={6} variant='h6' sx={{ color: '#fff' }}>
                Welcome back to Regenesys, Lets Start Learning
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
              <Link href="/myProfile" passHref legacyBehavior >
      <Box
      href=''
        component="a"
        sx={{ color: '#fff', textDecoration: 'none' }}
      >
        My Profile
      </Box>
    </Link>
                <Divider orientation='vertical' sx={{ bgcolor: '#fff' }} flexItem />
                <Link href={`/calendar`} passHref>
                  <Typography component='a' sx={{ color: '#fff', textDecoration: 'none' }}>
                    Calendar
                  </Typography>
                </Link>
                <Divider orientation='vertical' sx={{ bgcolor: '#fff' }} flexItem />
                <Link href={`/my-document`} passHref>
                  <Typography component='a' sx={{ color: '#fff', textDecoration: 'none' }}>
                    My Documents
                  </Typography>
                </Link>
                <Divider orientation='vertical' sx={{ bgcolor: '#fff' }} flexItem />

                <Link href={`/query`} passHref>
                  <Typography component='a' sx={{ color: '#fff', textDecoration: 'none' }}>
                    <Box display='flex'>
                      <Box display='contents'>
                        <HelpBox />
                      </Box>
                      <Box pl={1}>My Queries</Box>
                    </Box>
                  </Typography>
                </Link>

                <Typography component='a' sx={{ color: '#fff', textDecoration: 'none' }}>
                  <ExamTicket module={module} />
                </Typography>
              </Box>
            </Box>
          </Grid>
          {electiveRollover && (
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
                    <SelectElective
                      module={module}
                      studentDetails={studentDetails}
                      electiveModule={electiveModule}
                      getElectiveModuleList={getElectiveModuleList}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StudentDetails
