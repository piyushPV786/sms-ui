import { Box, Card, CardContent, Grid, Typography, styled } from '@mui/material'
import { GREEN, feeMode } from '../common/Constants'
import PaymentOptionCard from './components/paymentOptionCard'
import { LinearProgressWithLabel } from '../common'

const PaymentOptions = ({
  getPayuDetails,
  payuDetails,
  getPaymentRedirectURL,
  uploadPaymentProof,
  fees,
  setOpenPopup,
  disabled,
  updatePayment,
  uploadProgress,
  masterData,
  paymentStatusCheck
}: any) => {
  return (
    <FullWidthCard>
      <CardHeaderStyled>Payment Options</CardHeaderStyled>
      <CardContent>
        <Grid item xs={12}>
          {fees?.feeMode === '' && fees?.feeMode !== feeMode.APPLICATION && (
            <Typography color='error'>Please select Fee Mode to pay the Qualification fee.</Typography>
          )}
          <Grid container>
            <Grid item xs={12}>
              <PaymentOptionCard
                setOpenPopup={setOpenPopup}
                fees={fees}
                getPayuDetails={getPayuDetails}
                payuDetails={payuDetails}
                getPaymentRedirectURL={getPaymentRedirectURL}
                uploadPaymentProof={uploadPaymentProof}
                disabled={disabled}
                updatePayment={updatePayment}
                masterData={masterData}
                paymentStatusCheck={paymentStatusCheck}
              />
              {!!uploadProgress && <LinearProgressWithLabel value={uploadProgress} />}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </FullWidthCard>
  )
}

export default PaymentOptions

const FullWidthCard = styled(Card)(() => ({
  width: '100%'
}))

const CardHeaderStyled = styled(Box)(() => ({
  width: '100%',
  borderBottom: `2px solid ${GREEN}`,
  fontSize: '1.25rem',
  padding: '15px',
  color: `${GREEN}`
}))
