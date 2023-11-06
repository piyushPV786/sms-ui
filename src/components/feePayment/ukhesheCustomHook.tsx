/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { FinanceService } from 'src/service'
import { getPaymentInfo, paymentLogin } from 'src/service/payment'
import { IPaymentPayload, IPaymentResponse } from 'src/types/common'
import { successToast, errorToast } from '../common'

interface propsType {
  amount: string | null
  feeModeCode: string | null
  currencyCode: string | null
}

const UkhesheCustomHook = ({ amount, feeModeCode, currencyCode }: propsType) => {
  const auth = useAuth()

  const [ukhesheModal, setUkhesheModal] = useState<boolean>(false)
  const [paymentResponse, setPaymentResponse] = useState<IPaymentResponse>()
  const [loading, setLoading] = useState(false)

  const ukhesheOnlinePay = async (payload: IPaymentPayload) => {
    setLoading(true)
    const paymentResponse = await paymentLogin(payload)
    if (paymentResponse) {
      setPaymentResponse(paymentResponse)
      if (paymentResponse?.completionUrl) {
        window.open(paymentResponse?.completionUrl, '_ blank')
      }

      const interval = setInterval(async () => {
        const getPaymentResponse = await getPaymentInfo(paymentResponse?.paymentId)

        if (getPaymentResponse?.data?.status == 'SUCCESSFUL') {
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
          if (sendPaymentInfo?.status == 201) {
            setLoading(false)
            successToast('Payment Successfull')
          } else {
            errorToast('Payment Failed')
          }
          clearInterval(interval)
        }
      }, 10000)
    }
  }

  return {
    ukhesheModal,
    setUkhesheModal,
    paymentResponse,
    ukhesheOnlinePay,
    loading
  }
}

export default UkhesheCustomHook
