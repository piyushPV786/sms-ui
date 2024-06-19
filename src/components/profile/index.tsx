import { Grid, Typography } from '@mui/material'
import React from 'react'

interface IPropsProfileInfo {
  label: string
  info: string
  children?: React.ReactNode
}

export const ProfileInfo = ({ label, info, children }: IPropsProfileInfo) => {
  return (
    <Grid sm={4} xs={4} item mb={10}>
      <Typography variant='body2'>{label}</Typography>
      <Typography variant='caption'>{info}</Typography>
      {children}
    </Grid>
  )
}
