import { Card, styled, Typography, Theme, DialogContent } from '@mui/material'
import MuiCardContent from '@mui/material/CardContent'
import { getStatusColor } from 'src/utils'

export const AcademicTypography = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.common.white
}))

export const InlineTypography = styled(Typography)(() => ({
  display: 'inline'
}))

export const StyledTypography = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.main
}))

export const TableCard = styled(Card)(({}: { theme: Theme }) => ({
  '& .digital-assessment': {
    backgroundColor: 'rgb(106, 118, 124, 0.1)',
    '& p': {
      color: '#6A767C'
    }
  },
  '& .assignments': {
    backgroundColor: 'rgb(42, 107, 100, 0.1)',
    '& p': {
      color: '#2A6B64'
    }
  },
  '& .examination': {
    backgroundColor: 'rgb(91, 70, 78, 0.1)',
    '& p': {
      color: '#5B464E'
    }
  },
  '& .total': {
    backgroundColor: 'rgb(75, 183, 74, 0.1)',
    '& p': {
      color: '#4BB74A'
    }
  }
}))

export const CardContent = styled(MuiCardContent)(() => ({
  backgroundColor: 'rgb(80,149,142)'
}))

export const PopupDialog = styled(DialogContent)(() => ({
  position: 'relative',
  pb: 6,
  px: { xs: 5 },
  pt: { xs: 8 }
}))

export const StyledLink = styled('a')(({}) => ({
  fontSize: '14px',
  color: '#008554',
  textDecoration: 'underline',
  cursor: 'pointer'
}))

export const StyledStatusBedge = styled('div')<any>`
  background: ${({ status }) => `${getStatusColor(status)}`};
  color: white;
  padding: 2px 5px;
  border: 1px solid;
  position: relative;
  margin-right: 0 !important;
  border-top: 0;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 5px;
  padding: 5px 20px;
  letter-spacing: 0.5px;
  font-size: 14px;
`
export const StudentIdCard = styled('div')<{ bgColor?: string }>`
  background: ${({ bgColor }) => bgColor || '#235290'};
  color: white;
  max-width: 250px;
  border-radius: 3px;
  padding: 2px 8px;
  margin: 15px 5px 0 0;
  font-size: 13px;
  span {
    font-weight: bold;
  }
`

export const GreenFormHeading = styled('p')`
  font-size: 16px;
  font-weight: 500;
  color: #008554;
  margin: 0 0 2px;
  margin-right: 20px;

  @media (max-width: 510px) {
    img {
      width: 25px;
      height: 25px;
    }
  }
`
export const MainContainer = styled('div')`
  background: #dde1e3;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-bottom: 1rem;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch !important;
`
export const PaymentContainer = styled('div')`
  width: 100%;
  padding: 1.5rem;
`
export const Green = '#008554'
