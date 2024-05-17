import React from 'react'
import { Grid, Typography, Button } from '@mui/material'

interface ResponseItem {
  url: string
  id: number
  account: string
  name: string
  title: string
  telephone: string
  email: string
  dcbalance: number
  paymentlink: string
  vouchercode: string
  company: string
}

interface IdueProps {
  fintechData: ResponseItem[]
}

const CommonDueAmount = ({ fintechData }: IdueProps) => {
  const paymentLink = fintechData?.length > 0 ? fintechData[0]?.paymentlink : ''

  return (
    <>
      <Grid container py={2} pr={2} columnSpacing={4} style={{ backgroundColor: '#1f2b37', borderRadius: '10px' }}>
        <Grid item>
          <Typography fontSize={10} color='white'>
            Due Balance
          </Typography>
          <Typography
            variant='body2'
            color={fintechData?.length > 0 && fintechData[0]?.dcbalance > 0 ? '#f44336' : '#4caf50'}
          >
            <strong>{`R ${fintechData?.length > 0 ? fintechData[0]?.dcbalance : 0}`}</strong>
          </Typography>
        </Grid>
        <Grid item borderRight={theme => `1px solid ${theme.palette.grey[500]}`} />
        <Grid item display='flex' alignItems='center'>
          {fintechData?.length > 0 && fintechData[0]?.dcbalance > 0 ? (
            <a href={paymentLink} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'none' }}>
              <Button sx={{ mr: 2 }} variant='outlined' size='small' color='warning'>
                Pay
              </Button>
            </a>
          ) : (
            <Button
              sx={{ mr: 2, bgcolor: '#e0e0e3', borderRadius: 0.5 }}
              variant='outlined'
              size='small'
              color='warning'
              disabled
            >
              Pay
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default CommonDueAmount
