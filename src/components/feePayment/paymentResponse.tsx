import React from 'react'
import PaymentSuccess from './paymentSuccess'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PaymentResponsePage = ({ pageType }: { pageType: string }) => {
  return <> {pageType === 'success' && <PaymentSuccess />}</>
}

export default PaymentResponsePage
