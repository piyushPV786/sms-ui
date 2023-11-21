/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { FinanceService, CommonService, StudentService } from 'src/service'
import { getPaymentInfo, paymentLogin } from 'src/service/payment'
import { IPaymentPayload, IPaymentResponse } from 'src/types/common'
import { successToast, errorToast } from '../common'
import { getUkheshePayload } from 'src/utils'
import { feeStatus, paymentType } from 'src/context/common'

interface propsType {
  amount: string | null
  feeModeCode: string | null
  currencyCode: string | null
  applicationCode: string
  qualificaion: string
}

const UkhesheCustomHook = ({ amount, feeModeCode, currencyCode, applicationCode, qualificaion }: propsType) => {
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
          const payload = getUkheshePayload(
            getPaymentResponse,
            amount,
            feeModeCode,
            currencyCode,
            applicationCode,
            auth,
            qualificaion
          )
          const sendPaymentInfo = await FinanceService?.updateUkheshePayment(payload)
          if (sendPaymentInfo?.status == 201) {
            setLoading(false)
            const payload = {
              source: 'apply,enrolment',
              status: feeStatus.PROG_FEE_ACCEPTED,
              aapCode: applicationCode,
              paymentMode: paymentType.ONLINE
            }
            const res = await CommonService.setStatus(payload)
            if (res) {
              successToast('Payment Successfull')
            }
          }
          clearInterval(interval)
        } else if (getPaymentResponse?.data?.status == 'ERROR_PERM') {
          clearInterval(interval)
          setLoading(false)
          errorToast('Payment Failed')
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
