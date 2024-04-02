import React from 'react'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { Button, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'

import { useRouter } from 'next/router'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PayIcon = require('../../../public/images/pay.png') as string
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BackIcon = require('../../../public/images/icons/project-icons/back.svg') as string

const PaymentContainer = styled('div')<any>(({ theme }) => ({
  padding: `${theme.spacing(3)} !important`,
  minHeight: '350px',
  borderRadius: '8px',
  backgroundColor: 'white',
  maxWidth: '770px'
}))
const PaymentSuccess = () => {
  const router = useRouter()

  return (
    <Grid xs={12} display='flex' justifyContent='center'>
      <div className='d-flex justify-content-center mt-5'>
        <PaymentContainer>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='text-center mb-2'>
                <Image width={190} height='170' src={PayIcon} alt='payIcon' />
              </div>
              <div className='text-center w-100'>
                <Typography variant='h4' mb={5} color={'primary'}>
                  {' '}
                  Your Payment was Sucessful
                </Typography>
                <p>
                  Your transaction ID for this payment{' '}
                  <span style={{ color: '#008554' }} className='text-primary'>
                    {' '}
                    367562&nbsp;
                  </span>
                  You will receive an order confirmation email with details.
                </p>
                <Box display='flex' justifyContent='center'>
                  <Button
                    size='small'
                    variant='outlined'
                    onClick={() => router.push('/dashboard')}
                    sx={{
                      position: 'absolute',
                      backgroundColor: theme => theme.palette.common.white,
                      color: theme => theme.palette.primary.light,
                      borderColor: theme => theme.palette.primary.light
                    }}
                  >
                    <Image src={BackIcon} alt={BackIcon} />
                    &nbsp;&nbsp;BACK TO DASHBOARD
                  </Button>
                </Box>
              </div>
            </div>
          </div>
        </PaymentContainer>
      </div>
    </Grid>
  )
}

export default PaymentSuccess
