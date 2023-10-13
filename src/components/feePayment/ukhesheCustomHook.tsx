import { useState } from 'react'
import { paymentLogin } from 'src/service/payment'
import { IPaymentPayload, IPaymentResponse } from 'src/types/common'

const UkhesheCustomHook = () => {
  const [ukhesheModal, setUkhesheModal] = useState<boolean>(false)
  const [paymentResponse, setPaymentResponse] = useState<IPaymentResponse>()

  const ukhesheOnlinePay = async (payload: IPaymentPayload) => {
    const paymentResponse = await paymentLogin(payload)
    if (paymentResponse) {
      setPaymentResponse(paymentResponse)
      if (paymentResponse?.completionUrl) {
        window.open(paymentResponse?.completionUrl, '_ blank')
      }
    }
  }

  return {
    ukhesheModal,
    setUkhesheModal,
    paymentResponse,
    ukhesheOnlinePay
  }
}

export default UkhesheCustomHook
