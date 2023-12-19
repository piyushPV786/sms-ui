import { Button, styled } from '@mui/material'

const WhiteButton = styled(Button)(({ theme }) => ({
  mt: 3.5,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
}))

export default WhiteButton
