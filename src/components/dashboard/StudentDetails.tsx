// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import { AvatarProps, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getUserInfo } from 'src/utils'
import Stack from '@mui/material/Stack'

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

const StudentDetails = () => {
  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(7, 7.5)} !important` }}>
        <Grid container>
          <Grid item xs={2} md={3} sm={4}>
            <Box>
              <Avatar alt='R' src='/student/images/avatars/1.png' />
            </Box>
          </Grid>
          <Grid item xs={10} md={9} sm={8}>
            <Box ml={5}>
              <Typography mb={4} variant='h5' fontWeight={600} sx={{ color: '#fff' }}>
                Hi {getUserInfo()?.fullName}
              </Typography>
              <Typography mb={6} variant='h6' sx={{ color: '#fff' }}>
                Welcome back to Regenesys, Lets Start Learning
              </Typography>
              <Box sx={{ width: '100%', maxWidth: 360 }}>
                <List component={Stack} direction='row'>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={<Typography sx={{ color: '#fff' }}>My Profile</Typography>} />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ bgcolor: '#fff' }} orientation='vertical' flexItem />
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={<Typography sx={{ color: '#fff' }}>Calender</Typography>} />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ bgcolor: '#fff' }} orientation='vertical' flexItem />
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={<Typography sx={{ color: '#fff' }}>Documents</Typography>} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StudentDetails
