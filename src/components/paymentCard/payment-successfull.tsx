/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button } from '@mui/material'
import { Green, GreenFormHeading, MainContainer, PaymentContainer } from 'src/styles/styled'
import { routePaths } from '../common/Constants'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const WarningIcon = require('../../../public/images/warning-svgrepo-com.png') as string
const PayIcon = require('../../../public/images/pay.png') as string

const PaymentSuccessFull = (props: any) => {
  const router = useRouter()

  const OnlinePaymentSuccess = () => {
    return (
      <PaymentContainer>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='text-center mb-2'>
              <Image width='190' height='170' src={PayIcon} alt='payIcon' />
            </div>
            <div className='text-center w-100'>
              <GreenFormHeading style={{ fontSize: '24px' }}>Payment Successful</GreenFormHeading>
              <p>
                We will verify and get back to you. You wil receive an order confirmation <br />
                email with details soon.
              </p>
            </div>
          </div>
        </div>
      </PaymentContainer>
    )
  }
  const OfflinePaymentSuccess = () => {
    return (
      <PaymentContainer>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='text-center mb-2'>
              <Image width='190' height='170' src={PayIcon} alt='payIcon' />
            </div>
            <div className='text-center w-100'>
              <GreenFormHeading style={{ fontSize: '24px' }}>
                Your Payment Proof Was Submitted Successfully
              </GreenFormHeading>
              <p>We will verify and get back to you Shortly.</p>
            </div>
          </div>
        </div>
      </PaymentContainer>
    )
  }

  const OnlinePaymentFailed = () => {
    return (
      <>
        <PaymentContainer>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='text-center mb-2'>
                <Image width='100' height='100' src={WarningIcon} alt='warning' />
              </div>
              <div className='text-center w-100'>
                <GreenFormHeading style={{ fontSize: '28px', color: '#c42014' }}>Payment Failed</GreenFormHeading>
                <p>
                  Your payment was not successfully processed. Please try again, if you still <br />
                  encounter the same error, try again with another payment method.
                  <br />
                  In case of any query please feel free to contact{' '}
                  <span style={{ color: `${Green}` }}>1800 212 9950</span>
                </p>
              </div>
            </div>
          </div>
        </PaymentContainer>
      </>
    )
  }

  return (
    <MainContainer className='text-center'>
      <div className='container-fluid w-75 mt-5'>
        <PaymentContainer style={{ paddingBottom: '1rem' }}>
          {props?.pageType === 'failure' && <OnlinePaymentFailed />}
          {props?.pageType === 'onlinesuccess' && <OnlinePaymentSuccess />}
          {props?.pageType === 'success' && <OfflinePaymentSuccess />}
          <div>
            {props?.pageType === 'failure' && (
              <Button
                onClick={() => router.push(`/new-prog-payment/${props.appCode}`)}
                variant='outlined'
                color='primary'
                sx={{ mr: 2 }}
              >
                Retry Payment
              </Button>
            )}
            <Button
              onClick={() => {
                localStorage.setItem('leadData', '')
                sessionStorage.setItem('activeLeadDetail', '')
                router.push(routePaths.Dashboard)
              }}
              variant='outlined'
              color='primary'
            >
              Back to Dashboard
            </Button>
          </div>
        </PaymentContainer>
      </div>
    </MainContainer>
  )
}

export default PaymentSuccessFull
