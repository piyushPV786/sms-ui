import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Backdrop, Button, CircularProgress, Grid } from '@mui/material'
import UploadPaymentProof from '../uploadDocument/uploadPaymentProof'
import PaymentDetails from './paymentDetails'

export interface IFormValue {
  file: File | null
}

const PaymentProofCard = (props: any) => {
  const { uploadPaymentProof, disabled, updatePayment, masterData, paymentStatusCheck } = props
  const [isLoading, setLoading] = useState<boolean>(false)

  const {
    watch,
    handleSubmit,
    unregister,
    setValue,
    clearErrors,
    register,
    formState: { errors }
  } = useForm()

  const submitFile = async (data: any) => {
    setLoading(true)
    const payload = {
      files: [
        {
          documentTypeCode: 'PAYMENTPROOF',
          fileName: data?.file?.name,
          fileType: data?.file?.type
        }
      ]
    }
    await updatePayment(payload)
    setLoading(false)
  }

  return (
    <Grid container mt={5} rowGap={5} component='form' justifyContent='center'>
      <PaymentDetails masterData={masterData} />
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='primary' />
      </Backdrop>
      <Grid item xs={12} lg={6}>
        <UploadPaymentProof
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          watch={watch}
          unregister={unregister}
          errors={errors}
          name='file'
          uploadPaymentProof={uploadPaymentProof}
          paymentStatusCheck={paymentStatusCheck}
        />
      </Grid>
      <Grid item xs={12} display='flex' justifyContent='center'>
        <Button
          variant='contained'
          style={{ width: '120px' }}
          onClick={handleSubmit(submitFile)}
          disabled={!watch('file' as any) || disabled}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default PaymentProofCard
