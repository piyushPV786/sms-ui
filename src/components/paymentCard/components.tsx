import { Button, styled, Card, CardContent, Divider, Grid, TextField, Theme, Typography } from '@mui/material'
import { CheckCircle, DeleteOutline } from 'mdi-material-ui'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { getConvertedAmount } from '../payment/customHook/helper'
import { CommonEnums, feeMode } from '../common/Constants'
import { useDiscountHook } from '../payment/customHook/customHooks'

export const FinalFees = (props: any) => {
  const { masterData, studyModes, fees } = props

  const { showDiscount, toggleDiscount, applyDiscount, resetDiscount, discount } = useDiscountHook(
    masterData,
    fees,
    studyModes
  )
  const methods = useForm()
  const {
    handleSubmit,
    setValue,
    register,
    formState: {}
  } = methods

  useEffect(() => {
    methods.setValue('discountCode', '')
  }, [fees.discountAmount])

  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <PaymentCard>
        <CardContent>
          <Grid container spacing={1} sx={{ pb: 2 }}>
            <Grid item md={12} xs={12} display='flex' justifyContent='space-between'>
              <label>{fees?.label}</label>
              <Typography variant='body1'>
                <strong>{fees?.amount}</strong>
              </Typography>
            </Grid>
            {fees?.rmatAmount && (
              <Grid item md={12} xs={12} display='flex' justifyContent='space-between'>
                <label>RMAT Fee</label>
                <Typography variant='body1'>
                  <strong> {fees?.rmatAmount}</strong>
                </Typography>
              </Grid>
            )}
            {masterData?.applicationData?.status == CommonEnums.MONTHLY_PAYMENT_REJECT && fees.fee != '0.0' && (
              <Grid item md={12} xs={12} display='flex' justifyContent='space-between'>
                <label>Previously Paid Amount</label>
                <Typography variant='body1'>
                  <strong>
                    -{masterData?.currencyData?.currencySymbol}
                    {getConvertedAmount(
                      masterData?.currencyData,
                      studyModes?.fees?.find((item: { feeMode: any }) => item?.feeMode == feeMode?.MONTHLY).fee
                    )}
                  </strong>
                </Typography>
              </Grid>
            )}
            <Grid item md={12} xs={12} display='flex' justifyContent='space-between'>
              <label>Discount</label>
              <Typography variant='body1'>
                <strong>{fees?.discountAmount}</strong>
              </Typography>
            </Grid>
          </Grid>
          <Divider color='#b0aeae' sx={{ height: 2 }} />
          <Grid container spacing={2} sx={{ pb: 2 }}>
            <Grid item md={12} xs={12} display='flex' justifyContent='space-between'>
              <strong>Total Amount</strong>
              <Typography variant='body1'>
                <strong>{fees?.totalAmount}</strong>
              </Typography>
            </Grid>
          </Grid>

          {fees.feeMode != '' && (
            <Grid container display='flex' justifyContent='center' className='mt-2'>
              <Grid item xs={12} display='flex' justifyContent='center' className='cursor-pointer mb-3'>
                <StyledLink onClick={toggleDiscount}>Have a promo code?</StyledLink>
              </Grid>

              {showDiscount && (
                <FormProvider {...methods}>
                  <form>
                    {discount?.max == 0 && discount?.percent == 0 ? (
                      <Grid xs={12} spacing={1} container>
                        <Grid xs={9} item>
                          <TextField
                            placeholder='Enter Promo Code'
                            size='small'
                            fullWidth
                            {...register('discountCode', {
                              required: {
                                value: true,
                                message: 'This field is required'
                              }
                            })}
                            onChange={e => setValue('discountCode', e?.target?.value)}
                          />
                        </Grid>
                        <Grid xs={3} item>
                          <Button
                            onClick={handleSubmit(d => {
                              applyDiscount(d)
                            })}
                          >
                            Apply
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container spacing={2}>
                        <Grid xs={12} item>
                          <Grid item xs={12} display='flex' justifyContent='center'>
                            <Typography>
                              Promo Code : {`      `}
                              <strong>{discount.code}</strong>
                            </Typography>
                            <Typography
                              color={'red'}
                              className='cursor-pointer'
                              onClick={() => {
                                resetDiscount()
                              }}
                            >
                              <DeleteOutline />
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid xs={12} item display='flex' justifyContent='center'>
                          <Typography color={'#85546'} className='shortTypography'>
                            <CheckCircle />
                            <strong>{`You have saved ${fees.discountAmount} on this application`}</strong>
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </form>
                </FormProvider>
              )}
            </Grid>
          )}
        </CardContent>
      </PaymentCard>
    </Grid>
  )
}

const PaymentCard = styled(Card)(({}: { theme: Theme }) => ({
  background: '#f2f2f2 !important',
  borderRadius: '20px 20px',
  boxShadow: '10px 10px 10px #f0eded',
  width: '100%',
  marginBottom: '20px'
}))

export const StyledLink = styled('a')(({}) => ({
  fontSize: '14px',
  color: '#008554',
  textDecoration: 'underline'
}))
