import { useRouter } from 'next/router'
import Checkout from '.'

const CheckoutResponse = () => {
  const router = useRouter()
  const { slug, rollover } = router.query as any

  return (
    <Checkout
      amount={slug && slug[0]}
      feeModeCode={slug && slug[1]}
      currencyCode={slug && slug[2]}
      dueDate={slug && slug[3]}
      applicationCode={slug && slug[4]}
      rollover={!!rollover}
      qualificaion={slug && slug[5]}
    />
  )
}

export default CheckoutResponse
