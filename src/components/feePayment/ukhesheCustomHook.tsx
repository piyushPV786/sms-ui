import { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { FinanceService } from 'src/service'
import { getPaymentInfo, paymentLogin } from 'src/service/payment'
import { IPaymentPayload, IPaymentResponse } from 'src/types/common'

interface propsType {
  amount: string | null
  feeModeCode: string | null
  currencyCode: string | null
}

const UkhesheCustomHook = ({ amount, feeModeCode, currencyCode }: propsType) => {
  const auth = useAuth()

  const [ukhesheModal, setUkhesheModal] = useState<boolean>(false)
  const [paymentResponse, setPaymentResponse] = useState<IPaymentResponse>()

  const ukhesheOnlinePay = async (payload: IPaymentPayload) => {
    const paymentResponse = await paymentLogin(payload)
    if (paymentResponse) {
      setPaymentResponse(paymentResponse)
      if (paymentResponse?.completionUrl) {
        window.open(paymentResponse?.completionUrl, '_ blank')
      }

      setTimeout(async () => {
        const getPaymentResponse = await getPaymentInfo(paymentResponse?.paymentId)
        if (getPaymentResponse?.data) {
          const payload = {
            transactionId: getPaymentResponse?.data?.externalUniqueId,
            totalAmount: amount,
            totalPaidAmount: getPaymentResponse?.data?.amount,
            feeModeCode: feeModeCode,
            currencyCode: currencyCode,
            paymentStatus: getPaymentResponse?.data?.status,
            discountCode: '',
            discountAmount: 0,
            studentCode: auth?.user?.studentCode,
            ukheshe: {
              paymentId: getPaymentResponse?.data?.paymentId,
              gatewayTransactionId: getPaymentResponse?.data?.externalUniqueId,
              amount: getPaymentResponse?.data?.amount,
              status: getPaymentResponse?.data?.status,
              walletId: getPaymentResponse?.data?.walletId,
              currency: getPaymentResponse?.data?.currency,
              externalUniqueId: getPaymentResponse?.data?.externalUniqueId,
              paymentType: getPaymentResponse?.data?.paymentType
            }
          }
          const sendPaymentInfo = await FinanceService?.updateUkheshePayment(payload)
        }
      }, 60 * 2000)
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
