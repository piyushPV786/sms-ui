import { Card, styled, Typography } from '@mui/material'

export const AcademicTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white
}))

export const InlineTypography = styled(Typography)(({ theme }) => ({
  display: 'inline'
}))

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#4c9457'
}))

export const TableCard = styled(Card)(({ theme }) => ({
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
