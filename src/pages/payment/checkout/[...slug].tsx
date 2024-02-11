import { useRouter } from 'next/router'
import Checkout from '.'

const CheckoutResponse = () => {
  const router = useRouter()
  const { slug, rollover } = router.query as any
  const [appCode, paymentId] = slug

  return slug?.length > 0 && <Checkout applicationCode={appCode} id={paymentId} rollover={rollover} />
}

export default CheckoutResponse
