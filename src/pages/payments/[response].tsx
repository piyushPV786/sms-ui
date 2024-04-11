import { useRouter } from 'next/router'
import PaymentSuccessFull from 'src/components/paymentCard/payment-successfull'

const PaymentResponse = () => {
  const router = useRouter()
  const { appCode, response } = router.query

  return <PaymentSuccessFull pageType={String(response)?.toLowerCase()} appCode={String(appCode)} />
}

export default PaymentResponse
