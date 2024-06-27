/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import 'react-datepicker/dist/react-datepicker.css'
import { Backdrop, Button, CircularProgress } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import OrderSummeryCard from 'src/components/paymentCard/orderSummery'
import PaymentOption from 'src/components/paymentCard/paymentOption'
import { useQuery } from '@tanstack/react-query'
import { ApplyService } from 'src/service'
import {
  useOfflinePaymentHook,
  usePaymentDetailsHook,
  usePaymentHook,
  usePayuHook,
  useUkhesheHook
} from './customHook/customHooks'
import PaymentTimer from '../paymentCard/dialog/PaymentTimer'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BackIcon = require('../../../public/images/icons/project-icons/back.svg') as string

interface propsType {
  appCode: string
  studentCode: string
}

const Checkout = ({ appCode, studentCode }: propsType) => {
  const router = useRouter()
  const { data: studentDetail } = useQuery({
    queryKey: ['studentData', studentCode],
    queryFn: () => ApplyService?.getStudentDetail(studentCode),
    refetchOnWindowFocus: false
  })

  const { masterData } = usePaymentHook(appCode, studentDetail?.lead?.id)
  const { studyModes, fees, updateFeeMode } = usePaymentDetailsHook(masterData)

  const { getPayuDetails, payuDetails } = usePayuHook(masterData, fees)
  const { getPaymentRedirectURL, closePaymentDialog, setOpenPopup, openPopup, paymentStatusCheck } = useUkhesheHook(
    masterData,
    fees
  )

  const { uploadPaymentProof, disabled, updatePayment, uploadProgress } = useOfflinePaymentHook(masterData, fees)

  const isLoading =
    Object.values(masterData).every(data => data === null) && !studyModes?.fees?.length && fees?.fee == 0

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='primary' />
      </Backdrop>
      <Grid container spacing={6} sx={{ pl: 10, pr: 10 }}>
        <Grid item xs={12} spacing={5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Grid item xs={12}>
              <Typography sx={{ mb: 3, lineHeight: '2rem', fontWeight: 'bold', fontSize: 18 }}>CHECKOUT</Typography>
              <Grid item xs={12}>
                <Box>
                  <Typography>
                    <span
                      className='cursor-pointer'
                      id='dashboard'
                      style={{ color: '#4C9457' }}
                      onClick={() => router.push('/dashboard')}
                    >
                      Dashboard
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
            </Grid>
          </Box>
          <Grid item xs={12}>
            <OrderSummeryCard
              studyModes={studyModes}
              fees={fees}
              masterData={masterData}
              updateFeeMode={updateFeeMode}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: 5 }}>
            <PaymentOption
              masterData={masterData}
              getPayuDetails={getPayuDetails}
              payuDetails={payuDetails}
              fees={fees}
              getPaymentRedirectURL={getPaymentRedirectURL}
              uploadPaymentProof={uploadPaymentProof}
              setOpenPopup={setOpenPopup}
              disabled={disabled}
              updatePayment={updatePayment}
              uploadProgress={uploadProgress}
              paymentStatusCheck={paymentStatusCheck}
            />
          </Grid>
        </Grid>
        <PaymentTimer
          open={openPopup}
          closePaymentDialog={closePaymentDialog}
          getPaymentRedirectURL={getPaymentRedirectURL}
        />
      </Grid>
    </>
  )
}

export default Checkout
