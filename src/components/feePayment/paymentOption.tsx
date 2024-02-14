import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

import { Grid, Box, Paper, Typography, Button, Card, Backdrop, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import { PaymentTypes } from './constant'
import { GetPaymentImage } from 'src/utils'
import UploadPaymentProof from '../uploaddocument/uploadPaymentProof'
import { v4 as uuidv4 } from 'uuid'
import UkhesheCustomHook from './ukhesheCustomHook'
import UkheshePaymentModal from '../dialog/PaymentDialog'
import { StudentService, CommonService } from 'src/service'

const schema = yup.object().shape({
  uploadedFile: yup.mixed().required('Please upload any File')
})

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary
}))
const PaymentCard = styled<any>('div')(() => {
  return {
    textAlign: 'center',
    width: '100%',
    height: '90px',
    cursor: 'pointer',
    border: '2px solid #008554',
    margin: '0.2rem',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    input: {
      position: 'absolute',
      marginTop: '8px'
    },
    '&:hover': {
      backgroundColor: '#dbe7e3'
    }
  }
})

export const DragDropContainer = styled<any>('div')(() => ({
  background: '#dbe7e3',
  maxHeight: '300px',
  display: 'flex',
  padding: '1rem',
  cursor: 'pointer'
}))

interface propsType {
  amount: string | null
  feeModeCode: string | null
  currencyCode: string | null
  applicationCode: string
  qualificaion: string | any
}

const PaymentOption = ({ amount, feeModeCode, currencyCode, applicationCode, qualificaion }: propsType) => {
  const { ukhesheModal, setUkhesheModal, paymentResponse, ukhesheOnlinePay, loading } = UkhesheCustomHook({
    amount,
    feeModeCode,
    currencyCode,
    applicationCode,
    qualificaion
  })

  const [selectedPayment, setSelectedPaymentOption] = useState<string>('')
  const router = useRouter()
  const { watch, handleSubmit, unregister, setValue, clearErrors } = useForm({
    mode: 'onChange',
    defaultValues: {
      uploadedFile: null
    },
    resolver: yupResolver(schema)
  })
  useEffect(() => {
    setValue('uploadedFile', null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('currency Code ====>', currencyCode)

  const handlePay = async () => {
    if (selectedPayment === 'ukheshe') {
      const payload = {
        externalUniqueId: uuidv4(),
        amount: `${amount}`,
        currency: 'ZAR',
        type: 'GLOBAL_PAYMENT_LINK',
        paymentMechanism: 'CARD',
        paymentData: '198462'
      }
      await ukhesheOnlinePay(payload)
    }
  }
  const getSelectedFormId = () => {
    if (selectedPayment === 'payu') {
      return 'payuForm'
    }
    if (selectedPayment === 'payFast') {
      return 'payFastForm'
    }
    if (selectedPayment === 'ukheshe') {
    }
  }
  const submitFile = (data: { uploadedFile: { name: string } }) => {
    const payload = {
      documentTypeCode: 'PaymentProof',
      fileName: data?.uploadedFile?.name,
      fileType: data?.uploadedFile?.name.split('.')[1],
      amount: amount,
      feeModeCode: feeModeCode,
      discountAmount: 0,
      discountCode: '',
      currencyCode: currencyCode
    }

    StudentService.payOfflinefee(payload, sessionStorage?.getItem('studentCode')).then(data => {
      const payload = {
        filename: data?.data?.data?.name,
        filetype: data?.data?.data?.name?.split('.')[1],
        studentCode: data?.data?.data?.studentCode
      }
      CommonService.documentUpload(payload).then(data => {
        if (data) {
          router.push(`/payment/success/`)
        }
      })
    })
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: '1rem' }}>
        {loading && (
          <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
        )}

        {paymentResponse && (
          <UkheshePaymentModal
            open={ukhesheModal}
            onClose={() => setUkhesheModal(!ukhesheModal)}
            paymentResponse={paymentResponse}
          />
        )}
        <Grid container>
          <Grid item xs={6}>
            <Card sx={{ padding: 5 }}>
              <Typography variant='h6' mb={5} color={'primary'}>
                PAYMENT OPTIONS
              </Typography>
              <div className='d-flex justify-content-around mb-5'>
                {PaymentTypes.map(({ value }) => (
                  <>
                    <PaymentCard
                      className='mt-4'
                      onClick={() => {
                        setSelectedPaymentOption(value)
                      }}
                      key={value}
                      image={GetPaymentImage(value)}
                    >
                      <Grid container>
                        <Grid item xs={12} display='flex'>
                          <Grid item xs={6} display='flex' justifyContent='flex-end'>
                            <input
                              onClick={() => undefined}
                              className='form-check-input '
                              type='radio'
                              value={value}
                              onChange={() => setSelectedPaymentOption(value)}
                              checked={selectedPayment === value}
                            />
                          </Grid>
                          <Grid item xs={6} display='flex' justifyContent='flex-start'>
                            <Typography>Online</Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                          <Image
                            src={GetPaymentImage(value) as any}
                            alt={GetPaymentImage(value) as string}
                            height={50}
                            width={150}
                          />
                        </Grid>
                      </Grid>
                    </PaymentCard>
                  </>
                ))}
              </div>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem' }}
              >
                <Button
                  form={getSelectedFormId() as any}
                  type='submit'
                  size='large'
                  variant='contained'
                  onClick={handlePay}
                  disabled={!selectedPayment}
                  sx={{ position: 'absolute', borderRadius: '5', width: '130px' }}
                >
                  Pay
                </Button>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={1} display='flex' justifyContent='center' alignItems='center'>
            {' '}
            <Grid>Or</Grid>
          </Grid>

          <Grid item xs={5} md={5}>
            <form onSubmit={handleSubmit(submitFile)}>
              <Item>
                <Typography variant='h6' mb={5} color={'primary'}>
                  UPLOAD PAYMENT PROOF
                </Typography>
                <UploadPaymentProof
                  setValue={setValue}
                  clearErrors={clearErrors}
                  watch={watch}
                  unregister={unregister}
                  name='uploadedFile'
                />
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem' }}
                >
                  <Button
                    size='large'
                    variant='contained'
                    type='submit'
                    disabled={!watch('uploadedFile')}
                    sx={{ position: 'absolute', borderRadius: '5', width: '130px' }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Item>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default PaymentOption
