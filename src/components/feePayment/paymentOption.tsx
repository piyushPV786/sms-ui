import React, { useRef, useState } from 'react'
import Image from 'next/image'

import { Grid, Box, Paper, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { PaymentTypes } from './constant'
import { GetPaymentImage } from 'src/utils'
import { DeleteCircleOutline } from 'mdi-material-ui'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DragDropImg = require('../../../public/images/drag_drop.png')

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
    border: '1px solid #008554',
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paymentPayload, setPaymentTypePayload] = useState<any>(null)
  const [selectedPayment, setSelectedPaymentOption] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const fileUploadRef = useRef<any>(null)

  const handlePay = () => {
    undefined
  }
  const getSelectedFormId = () => {
    if (selectedPayment === 'payu') {
      return 'payuForm'
    }
    if (selectedPayment === 'payFast') {
      return 'payFastForm'
    }
  }
  const onDocUploadClick = () => {
    const fileElement = fileUploadRef.current?.children[0] as any
    fileElement?.click() as any
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Item>
              <Typography variant='h6' mb={5} color={'primary'}>
                ORDER SUMMARY
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
                      <Image
                        width={value === 'payfast' ? 120 : 80}
                        height={value === 'payfast' ? 10 : 70}
                        src={GetPaymentImage(value) as any}
                        alt={GetPaymentImage(value) as string}
                      />
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
            </Item>
          </Grid>
          <Grid item xs={2} md={2}>
            <div className='d-flex justify-content-center align-items-center h-100' style={{ textAlign: 'center' }}>
              {' '}
              <Typography variant='h6' mb={5} color={'primary'}>
                Or
              </Typography>{' '}
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <Item>
              <Typography variant='h6' mb={5} color={'primary'}>
                UPLOAD PAYMENT PROO
              </Typography>
              <DragDropContainer
                onClick={onDocUploadClick}
                className='justify-content-center align-items-center flex-wrap'
              >
                <Image src={DragDropImg} alt={DragDropImg} />

                <div ref={fileUploadRef} className='w-100 h-100'>
                  <input
                    className='d-none'
                    accept='image/jpeg, application/pdf'
                    type='file'
                    onChange={e => {
                      if (e?.target) {
                        const files = e.target?.files![0]
                        setPaymentProof(files)
                      }
                    }}
                  />
                </div>
                <Typography className='w-100 text-center' variant='h6' mb={1} color={'dark'}>
                  <b>
                    {' '}
                    Drag and drop, or <span style={{ color: '#4C9457' }}>browse</span> your file
                  </b>
                </Typography>
                <Typography className='w-100 text-center' variant='body2' mb={1} color={'secondary'}>
                  Only PNG, JPEG and PDF files with max size of 2MB
                </Typography>
                <div onClick={e => e.stopPropagation()} className='d-flex flex-wrap'>
                  {paymentProof && (
                    <span
                      style={{
                        color: '#000',
                        wordBreak: 'break-all'
                      }}
                      className='w-100'
                      key={paymentProof.lastModified}
                    >
                      {paymentProof?.name} <DeleteCircleOutline onClick={() => setPaymentProof(null)} />
                    </span>
                  )}
                </div>
              </DragDropContainer>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem' }}
              >
                <Button
                  size='large'
                  variant='contained'
                  onClick={handlePay}
                  disabled={!paymentProof}
                  sx={{ position: 'absolute', borderRadius: '5', width: '130px' }}
                >
                  Submit
                </Button>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default PaymentOption
