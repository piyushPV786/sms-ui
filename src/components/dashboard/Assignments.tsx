import { Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import { Box } from '@mui/system'

import { Launch } from 'mdi-material-ui'

const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(3)} !important`,
  borderTop: '8px solid #FFA427',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '0 !important'
  }
}))

const StyledLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',

  alignSelf: 'flex-end',
  color: '#008554'
}))

const Assignments = () => {
  return (
    <Card sx={{ position: 'relative', borderRadius: '0px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' mb={5} color={'primary'}>
            ASSIGNMENTS
          </Typography>
          <Box>
            <Typography variant='caption'>Current Program</Typography>
            <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
              Master of Computer Application (MBA)
            </Typography>
          </Box>
          <Box>
            <Typography variant='caption'>Current Program</Typography>
            <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
              Master of Computer Application (MBA)
            </Typography>
          </Box>
          <StyledLink href='/'>
            <Launch />
            More Assignmnets
          </StyledLink>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Assignments
