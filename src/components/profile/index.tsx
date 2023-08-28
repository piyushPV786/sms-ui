import { Grid, Typography } from '@mui/material'

interface IPropsProfileInfo {
  label: string
  info: string
}

export const ProfileInfo = ({ label, info }: IPropsProfileInfo) => {
  return (
    <Grid sm={4} xs={4} item mb={10}>
      <Typography variant='body2'>{label}</Typography>
      <Typography variant='caption'>{info}</Typography>
    </Grid>
  )
}
