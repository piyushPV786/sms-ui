import { Card, styled, Typography, Theme, DialogContent } from '@mui/material'
import MuiCardContent from '@mui/material/CardContent'

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
  textDecoration: 'underline'
}))
