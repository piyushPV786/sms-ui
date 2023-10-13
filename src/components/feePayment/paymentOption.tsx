import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Grid, Box, Paper, Typography, Button, Card } from '@mui/material'
import { styled } from '@mui/material/styles'
import { PaymentTypes } from './constant'
import { GetPaymentImage } from 'src/utils'
import UploadPaymentProof from '../uploaddocument/uploadPaymentProof'
import { paymentLogin } from 'src/service/payment'
import { v4 as uuidv4 } from 'uuid'
import { IPaymentResponse } from 'src/types/common'
import UkhesheCustomHook from './ukhesheCustomHook'
import UkheshePaymentModal from '../dialog/PaymentDialog'

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
const PaymentOption = () => {
  const { ukhesheModal, setUkhesheModal, paymentResponse, ukhesheOnlinePay } = UkhesheCustomHook()
  const [paymentPayload] = useState<any>(null)
  const [selectedPayment, setSelectedPaymentOption] = useState<string>('')
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

  const handlePay = async () => {
    if (selectedPayment === 'ukheshe') {
      const payload = {
        externalUniqueId: uuidv4(),
        amount: '100',
        currency: 'USD',
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
  const submitFile = (data: File) => {
    console.log('formdata', data)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: '1rem' }}>
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
                Payment Options
              </Typography>
              <div className='d-flex justify-content-around mb-5'>
                {PaymentTypes.map(({ value }) => (
                  <>
                    {' '}
                    <PaymentCard
                      className='mt-4'
                      onClick={() => setSelectedPaymentOption(value)}
                      key={value}
                      image={GetPaymentImage(value)}
                    >
                      <input
                        onClick={() => undefined}
                        className='form-check-input '
                        type='radio'
                        value={value}
                        onChange={() => setSelectedPaymentOption(value)}
                        checked={selectedPayment === value}
                      />
                      <Box
                        sx={{
                          width: '50% !important',
                          height: '40% !important',
                          maxWidth: '50%',
                          minHeight: '40%',
                          position: 'relative',
                          top: '30px'
                        }}
                      >
                        <Image src={GetPaymentImage(value) as any} alt={GetPaymentImage(value) as string} />
                      </Box>
                    </PaymentCard>
                    <>
                      <form method='post' id={value} action={paymentPayload?.paymenturl}>
                        {paymentPayload &&
                          Object.keys(paymentPayload).map(item => (
                            <input key={item} type='hidden' name={item} value={paymentPayload[item]} />
                          ))}
                      </form>
                    </>
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
