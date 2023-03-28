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

export const TableCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  '& .digital-assessment': {
    backgroundColor: '#58555e',
    color: theme.palette.common.white
  },
  '& .assignments': {
    backgroundColor: '#726262',
    color: theme.palette.common.white
  },
  '& .examination': {
    backgroundColor: '#5f5870',
    color: theme.palette.common.white
  },
  '& .total': {
    backgroundColor: '#3c7360',
    color: theme.palette.common.white
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
