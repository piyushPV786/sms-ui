import axios from 'axios'
import nProgress from 'nprogress'
import { IPaymentPayload } from 'src/types/common'
import { getLocalStorageData } from 'src/utils'
import { FinanceService } from 'src/service'

export const paymentLogin = async (paymentPayload: IPaymentPayload) => {
  nProgress.start()
  try {
    let paymentResponse = null
    const payload = {
      identity: process.env.NEXT_PUBLIC_PAYMENT_IDENTITY,
      password: process.env.NEXT_PUBLIC_PAYMENT_PASSWORD
    }
    const response = await FinanceService.getUkheshePaymentTocken()

    if (response?.status === 200 || (response?.status === 201 && response?.data)) {
      window.localStorage.setItem('paymentToken', JSON.stringify(response))
      const headers = {
        'Content-Type': 'application/json',
        Authorization: response?.data?.data?.headerValue
      }
      const url = `${process.env.NEXT_PUBLIC_PAYMENT_TENENT_LOGIN_API}${process.env.NEXT_PUBLIC_TENENT_ID}/payments`
      const paymentRes = await axios.post(url, paymentPayload, { headers: headers })
      if (paymentRes?.status === 200 && paymentRes?.data) {
        paymentResponse = paymentRes?.data
      }
    }
    nProgress.done()

    return paymentResponse
  } catch (err: any) {
    console.log('Error while payment page ========>', err?.message)
    nProgress.done()
  }
}

export const getPaymentInfo = async (paymentId: number) => {
  nProgress.start()
  const tokenDetails = getLocalStorageData('paymentToken')

  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: tokenDetails?.data?.data?.headerValue
    }
    const url = `${process.env.NEXT_PUBLIC_PAYMENT_TENENT_LOGIN_API}${process.env.NEXT_PUBLIC_TENENT_ID}/payments/${paymentId}`
    const paymentRes = await axios.get(url, { headers: headers })

    nProgress.done()

    return paymentRes
  } catch (err: any) {
    console.log('Error while payment page ========>', err?.message)
    nProgress.done()
  }
}
