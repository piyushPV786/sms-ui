import { Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import { Launch } from 'mdi-material-ui'
import { Box } from '@mui/system'
import Link from 'next/link'

const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(3)} !important`,
  borderTop: '8px solid #6151FB',
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

const Program = () => {
  return (
    <Card sx={{ position: 'relative', borderRadius: '0px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' mb={5} color={'primary'}>
            My PROGRAM
          </Typography>
          <Box>
            <Typography variant='caption'>Current Program</Typography>
            <Typography variant='body2' sx={{ mb: 5, fontWeight: 600, color: 'text.primary' }}>
              Master of Computer Application (MBA)
            </Typography>
          </Box>
          <Box>
            <Typography variant='caption'>Current Program</Typography>
            <Typography variant='body2' sx={{ mb: 5, fontWeight: 600, color: 'text.primary' }}>
              Master of Computer Application (MBA)
            </Typography>
          </Box>
          <Box>
            <Typography variant='caption'>Current Program</Typography>
            <Typography variant='body2' sx={{ mb: 5, fontWeight: 600, color: 'text.primary' }}>
              Master of Computer Application (MBA)
            </Typography>
          </Box>
          <Box>
            <Typography variant='caption'>Current Program</Typography>
            <Typography variant='body2' sx={{ mb: 5, fontWeight: 600, color: 'text.primary' }}>
              Master of Computer Application (MBA)
            </Typography>
          </Box>
          <StyledLink href='/'>
            <Launch />
            Apply New Program
          </StyledLink>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Program
