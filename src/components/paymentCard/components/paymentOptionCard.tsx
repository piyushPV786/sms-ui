import React, { useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { PaymentTypes } from 'src/context/common'
import { Box, Button, Grid } from '@mui/material'
import { GetPaymentImage } from 'src/utils'
import PaymentProofCard from './paymentProofCard'
import UkhesheInput from './ukhesheInput'

const PaymentOptionCard = (props: any) => {
  const {
    getPayuDetails,
    uploadPaymentProof,
    fees,
    setOpenPopup,
    disabled,
    updatePayment,
    masterData,
    paymentStatusCheck,
    documentCode
  } = props
  const methods = useForm()
  const { register, watch, setValue } = methods
  const onlinePaymentWatch = watch(PaymentTypes[0].registerName)
  useEffect(() => {
    setValue(PaymentTypes[0].registerName, 'ukheshe')
  }, [])
  useEffect(() => {
    const payu = PaymentTypes.find(item => item?.name === 'Payu')
    if (onlinePaymentWatch && payu?.value === onlinePaymentWatch) {
      getPayuDetails()
    }
  }, [onlinePaymentWatch])

  return (
    <>
      <Grid container display='flex' justifyContent='center' alignItems='center'>
        {PaymentTypes.map(({ name, value, registerName, label }, index) => (
          <Grid item sm={4} md={4} key={index}>
            {name === 'Ukheshe' ? (
              <UkhesheInput value={value} setOpenPopup={setOpenPopup} paymentStatusCheck={paymentStatusCheck} />
            ) : null}

            <Grid container>
              <Grid
                item
                sm={12}
                md={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <input
                  {...register(registerName)}
                  className='form-check-input'
                  type='radio'
                  value={value}
                  disabled={fees?.feeMode === ''}
                />
                <span style={{ marginLeft: '5px', marginTop: '3px' }}>{label}</span>
              </Grid>
              <Grid
                item
                sm={12}
                md={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {name === 'Ukheshe' ? (
                  <Image
                    width={150}
                    height={30}
                    style={{
                      position: 'relative',
                      bottom: '4px',
                      marginLeft: '2px'
                    }}
                    src={GetPaymentImage(value) as any}
                    alt={GetPaymentImage(value) as string}
                  />
                ) : (
                  <Box sx={{ height: '25px' }}></Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}

        {onlinePaymentWatch === 'offline' && (
          <PaymentProofCard
            masterData={masterData}
            uploadPaymentProof={uploadPaymentProof}
            disabled={disabled}
            updatePayment={updatePayment}
            paymentStatusCheck={paymentStatusCheck}
            documentCode={documentCode}
          />
        )}
      </Grid>

      {onlinePaymentWatch !== 'offline' && (
        <Grid container display='flex' justifyContent='center' sx={{ p: 2 }}>
          <Button
            variant='contained'
            style={{ width: '120px' }}
            form={onlinePaymentWatch}
            type='submit'
            disabled={!onlinePaymentWatch || fees?.feeMode == ''}
          >
            Pay Now
          </Button>
        </Grid>
      )}
    </>
  )
}

export default PaymentOptionCard
