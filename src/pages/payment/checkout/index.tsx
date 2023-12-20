/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import React, { useEffect, useState } from 'react'
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
import { FinanceService, StudentService } from 'src/service'
import { status } from 'src/context/common'
import DashboardCustomHooks from 'src/components/dashboard/CustomHooks'

const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(4)} !important`
}))
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BackIcon = require('../../../../public/images/icons/project-icons/back.svg') as string

interface propsType {
  applicationCode: string

  id: string | number
  rollover?: boolean
}

interface IResponseType {
  feeModeCode: string
  dueDate: any
  currencyCode: string
  dueAmount: string
  applicationCode: string
  qualificaion: string
}

const Checkout = ({ applicationCode, id, rollover }: propsType) => {
  // ** State
  const [response, setResponse] = useState<IResponseType>()
  const [currencyCode, setCurrencyCode] = useState<string>('')

  const router = useRouter()
  const { studentDetails } = DashboardCustomHooks()

  const amount = '500'
  const feeModeCode = 'Rollover'
  const dueDate = DDMMYYYDateFormat(new Date())

  const handleBreadcrum = (e: any) => {
    e.preventDefault()
    const route = e.target.id
    router.push(`/${route}`)
  }

  const getFeePaymentList = async () => {
    const payload = {
      q: '',
      pageSize: 10,
      pageNumber: 1
    }
    if (applicationCode) {
      const response = await StudentService?.getFeePaymentList(payload, applicationCode)
      if (response?.data?.statusCode === status.successCode && response?.data?.data) {
        const filteredData = response?.data?.data?.data?.find((item: { id: string | number }) => {
          return item?.id == id
        })

        setResponse(filteredData)
      }
    }
  }

  const getCurrencyCode = async () => {
    if (studentDetails && rollover) {
      const response1 = await FinanceService?.getCurrencyRate(studentDetails.nationality)

      setCurrencyCode(response1?.data?.data?.currencyCode)
    }
  }
  useEffect(() => {
    rollover ? getCurrencyCode() : getFeePaymentList()
  }, [applicationCode, studentDetails])

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
                      <strong>{!rollover ? response?.feeModeCode : feeModeCode}</strong>
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant='h6' mb={1} color={'secondary'}>
                      Due Date
                    </Typography>
                    <Typography variant='body1' mb={5} color={'dark'}>
                      <strong>{!rollover ? DDMMYYYDateFormat(new Date(response?.dueDate)) : dueDate}</strong>
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
                              Subtotal ({!rollover ? response?.currencyCode : currencyCode})
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
                              {` R ${!rollover ? response?.dueAmount : amount}`}
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
                      <strong> {` R ${!rollover ? response?.dueAmount : amount}`}</strong>
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {response && !rollover ? (
        <PaymentOption
          amount={response?.dueAmount}
          feeModeCode={response?.feeModeCode}
          currencyCode={response?.currencyCode}
          applicationCode={response?.applicationCode}
          qualificaion={response?.qualificaion}
        />
      ) : studentDetails?.program ? (
        <PaymentOption
          amount={amount}
          feeModeCode={feeModeCode}
          currencyCode={currencyCode}
          applicationCode={applicationCode}
          qualificaion={studentDetails?.program?.name}
        />
      ) : null}
    </>
  )
}

export default Checkout
