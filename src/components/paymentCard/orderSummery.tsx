import { Card, CardContent, Grid, Typography } from '@mui/material'
import { CommonEnums, applicationFeesStatus, feeMode } from '../common/Constants'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { FinalFees } from './components'

const OrderSummeryCard = (props: any) => {
  const { studyModes, fees, masterData, updateFeeMode } = props
  const methods = useForm()
  const { register, watch } = methods
  const data = watch('feeModeCode')

  
  useEffect(() => {
    updateFeeMode(data)
  }, [data])

  return (
    <>
      <Card>
        <CardContent>
          <Grid>
            <Grid item md={12} xs={12}>
              <Typography variant='h6' mb={5} color={'primary'}>
                ORDER SUMMARY
              </Typography>
            </Grid>
            <Grid container spacing={6}>
              <Grid item md={6} xs={6}>
                <Grid item md={12} xs={12} display='flex' sx={{ pb: 5 }}>
                  <Grid item md={6} xs={6}>
                    <Typography variant='h6' color={'secondary'}>
                      Interested Qualification
                    </Typography>
                    <Typography variant='body1' color={'dark'}>
                      <strong>{masterData?.feeData?.programName}</strong>
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Grid>
                      <Typography variant='h6' color={'secondary'}>
                        {fees?.label}( {fees?.amount} )
                      </Typography>
                      <Typography variant='body1'>
                        <strong>
                          {fees?.amount} {fees?.helpText}
                        </strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12} xs={12} display='flex'>
                  <Grid item md={6} xs={6}>
                    <Typography variant='h6' color={'secondary'}>
                      Fee Category
                    </Typography>
                    <Typography variant='body1' color={'dark'}>
                      <strong>{fees?.label}</strong>
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Typography variant='h6' color={'secondary'}>
                      Study Mode
                    </Typography>
                    <Typography variant='body1'>
                      <strong>{studyModes?.studyModeCode}</strong>({studyModes?.helpText} )
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={12} xs={12}>
                  {!applicationFeesStatus.includes(masterData?.applicationData?.status) && (
                    <Grid item md={12} xs={12}>
                      {!applicationFeesStatus.includes(masterData?.applicationData?.status) && masterData?.applicationData?.eligibility &&
                        !masterData?.applicationData?.eligibility[0]?.accessProgram && (
                          <Grid>
                            <Typography variant='h6' color={'secondary'}>
                              Fee Mode
                            </Typography>
                            <Grid item display='flex'>
                              {studyModes?.fees
                              ?.filter((item: { feeMode: feeMode }) => item?.feeMode !== feeMode.APPLICATION && item?.feeMode !== feeMode.TOTAL)
                              .sort((a: { feeMode: string }, b: { feeMode: string }) => {
                                        const aStartsWithA = a.feeMode.startsWith('A');
                                        const bStartsWithA = b.feeMode.startsWith('A');
                                        
                                        if (aStartsWithA && !bStartsWithA) return -1;
                                        if (!aStartsWithA && bStartsWithA) return 1;
                                        
                                        return 0;
                                    })
                                .reverse()
                                .map((item: any, index: number) => {
                                  if (item?.feeMode !== feeMode.APPLICATION && item?.feeMode !== feeMode.TOTAL) {
                                    return (
                                      // eslint-disable-next-line react/jsx-key
                                      <Grid item xs={2.5}>
                                        <div className='form-check form-check-inline'>
                                          <input
                                            {...register('feeModeCode', {
                                              required: {
                                                value: true,
                                                message: 'Please select Fee mode'
                                              }
                                            })}
                                            key={index}
                                            className='form-check-input me-2'
                                            type='radio'
                                            value={item?.feeMode}
                                            disabled={
                                              item?.feeMode == feeMode?.MONTHLY &&
                                              masterData?.applicationData?.status == CommonEnums?.MONTHLY_PAYMENT_REJECT
                                            }
                                          />
                                          <label className='form-check-label'>
                                            <strong>
                                              {item?.feeMode}
                                              <Typography sx={{ pl: 4 }}>R{item?.fee}</Typography>
                                            </strong>
                                          </label>
                                        </div>
                                      </Grid>
                                    )
                                  }
                                })}
                            </Grid>
                          </Grid>
                        )}
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item md={6} xs={6}>
                <FinalFees masterData={masterData} studyModes={studyModes} fees={fees} />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default OrderSummeryCard

