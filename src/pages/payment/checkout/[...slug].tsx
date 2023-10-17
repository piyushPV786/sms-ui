import { useRouter } from 'next/router'
import Checkout from '.'

const CheckoutResponse = () => {
  const router = useRouter()
  const { slug } = router.query as any

  return <Checkout amount={slug && slug[0]} feeModeCode={slug && slug[1]} currencyCode={slug && slug[2]} />
}

export default CheckoutResponse
