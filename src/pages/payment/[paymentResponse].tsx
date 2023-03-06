import { useRouter } from 'next/router'
import PaymentResponsePage from 'src/components/feePayment/paymentResponse'

const PaymentResponse = () => {
  const router = useRouter()
  const pageType = router.query.response as string

  return <PaymentResponsePage pageType={pageType?.toLowerCase()} />
}

export default PaymentResponse
