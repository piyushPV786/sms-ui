/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import React from 'react'
import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Third Party Styles Imports
import { styled } from '@mui/material/styles'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import PaymentOption, { DragDropContainer } from 'src/components/feePayment/paymentOption'
import { DDMMYYYDateFormat } from 'src/utils'

const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(4)} !important`
}))
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BackIcon = require('../../../../public/images/icons/project-icons/back.svg') as string

interface propsType {
  amount: string | null
  feeModeCode: string | null
  currencyCode: string | null
  dueDate: string | any
  applicationCode: string
  rollover?: boolean
  qualificaion: string
}

const Checkout = ({ amount, feeModeCode, currencyCode, dueDate, applicationCode, qualificaion }: propsType) => {
  // ** State

  const router = useRouter()

  const handleBreadcrum = (e: any) => {
    e.preventDefault()
    const route = e.target.id
    router.push(`/${route}`)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Grid item xs={12}>
              <Typography sx={{ mb: 3, lineHeight: '2rem', fontWeight: 'bold', fontSize: 18 }}>
                FEE & PAYMENT HISTORY
              </Typography>
              <Grid item xs={12}>
                <Box>
                  <Typography>
                    {' '}
                    <span
                      className='cursor-pointer'
                      onClick={handleBreadcrum}
                      id='dashboard'
                      style={{ color: '#4C9457' }}
                    >
                      Dashboard /{' '}
                      <span className='cursor-pointer' onClick={handleBreadcrum} id='payment'>
                        Fee & Payment History{' '}
                      </span>
                    </span>
                    / Checkout
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ pt: '10px', mb: '1rem' }}>
              <Box display='flex' justifyContent='flex-end'>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => router.back()}
                  sx={{
                    position: 'absolute',
                    backgroundColor: theme => theme.palette.common.white,
                    color: theme => theme.palette.primary.light,
                    borderColor: theme => theme.palette.primary.light
                  }}
                >
                  <Image src={BackIcon} alt={BackIcon} />
                  &nbsp;&nbsp;BACK TO FEE & PAYMENT HISTORY
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid>
                <Grid item md={12} xs={12}>
                  {' '}
                  <Typography variant='h6' mb={5} color={'primary'}>
                    ORDER SUMMARY
                  </Typography>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Grid item md={6} xs={12}>
                    <Typography variant='h6' mb={1} color={'secondary'}>
                      Fee Category
                    </Typography>
                    <Typography variant='body1' mb={5} color={'dark'}>
                      <strong>{feeModeCode}</strong>
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant='h6' mb={1} color={'secondary'}>
                      Due Date
                    </Typography>
                    <Typography variant='body1' mb={5} color={'dark'}>
                      <strong>{DDMMYYYDateFormat(new Date(dueDate))}</strong>
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DragDropContainer style={{ borderRadius: '8px', minHeight: '180px', display: 'block' }}>
                      <Grid className='w-100' xs={12} md={12}>
                        <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                          <Grid item xs={6}>
                            <Typography
                              variant='h6'
                              sx={{ mb: 1, lineHeight: '2rem', fontWeight: 'bold', fontSize: 16 }}
                            >
                              Subtotal ({currencyCode})
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant='h6'
                              sx={{
                                mb: 1,
                                lineHeight: '2rem',
                                fontWeight: 'bold',
                                fontSize: 16,
                                textAlign: 'right'
                              }}
                            >
                              {` R ${amount}`}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </DragDropContainer>
                  </Grid>
                </Box>
                <Box>
                  <Grid item md={6} xs={12}>
                    <Typography variant='h6' mb={1} color={'secondary'}>
                      Amount Payable
                    </Typography>
                    <Typography variant='body1' mb={5} color={'dark'}>
                      <strong> {` R ${amount}`}</strong>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <PaymentOption
        amount={amount}
        feeModeCode={feeModeCode}
        currencyCode={currencyCode}
        applicationCode={applicationCode}
        qualificaion={qualificaion}
      />
    </>
  )
}

export default Checkout
