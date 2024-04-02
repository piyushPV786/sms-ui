import { CommonEnums, FeeModeCode } from 'src/components/common/Constants'

export const bursaryFeeCalculation = (bursaryDetails: any, payload: any) => {
  if (
    bursaryDetails?.education &&
    bursaryDetails?.education[0]?.bursaryAmount &&
    payload?.feeData &&
    payload?.programData &&
    payload?.applicationData &&
    payload?.applicationData?.education
  ) {
    const feeDetails = payload?.feeData?.studyModes?.find(
      (item: { studyModeCode: any }) => item?.studyModeCode === payload?.applicationData?.education?.studyModeCode
    )
    if (feeDetails?.fees) {
      const totalFeeAmount = getTotalFeeAmount(feeDetails?.fees)
      if (totalFeeAmount > 0) {
        const feeCalculationResult: any = feeCalculate(
          totalFeeAmount - bursaryDetails?.education[0]?.bursaryAmount,
          payload?.programData?.noOfYear
        )

        const feeChange = feeDetails?.fees?.map((item: any) => {
          return item?.feeMode !== FeeModeCode?.APPLICATION
            ? { ...item, fee: feeCalculationResult[item?.feeMode] }
            : item
        })

        return {
          ...payload?.feeData,
          studyModes: payload?.feeData?.studyModes?.map((element: any) => {
            return { ...element, fees: feeChange }
          })
        }
      }
    }
  }
}

const getTotalFeeAmount = (feesList: any[]) => {
  let result = 0
  const totalFee = feesList?.find((item: { feeMode: any }) => item?.feeMode === CommonEnums?.TOTAL)
  if (totalFee?.fee) {
    result = totalFee?.fee
  }
  
return result
}

const feeCalculate = (TOTAL: number, noOfYears: number) => {
  const numberOfMonths = noOfYears * 12
  const numberOfSemesters = (noOfYears * 12) / 6
  const numberOfYears = noOfYears
  const MONTHLY = checkGreaterThanZero(Math.round(TOTAL / numberOfMonths))
  const SEMESTER = checkGreaterThanZero(Math.round(TOTAL / numberOfSemesters))
  const ANNUALLY = checkGreaterThanZero(Math.round(TOTAL / numberOfYears))
  
return { MONTHLY, SEMESTER, ANNUALLY, TOTAL }
}

const checkGreaterThanZero = (NumberOfEMi: number) => {
  return NumberOfEMi > 0 ? NumberOfEMi : 0
}

export const getConvertedAmount = (currencyData: any, amount: string) => {
  if (currencyData && parseInt(currencyData?.forecastRate)) {
    return Number(parseInt(amount) * parseFloat(currencyData?.forecastRate)).toFixed()
  } else if (parseInt(currencyData?.rate)) {
    return Number(parseInt(amount) * parseFloat(currencyData?.rate)).toFixed()
  } else {
    return Number(amount)
  }
}

export const getUkheshePayload = (getPaymentResponse: any, fees: any, masterData: any) => {
  return {
    transactionId: getPaymentResponse?.data?.externalUniqueId,
    totalAmount: fees?.totalFee,
    totalPaidAmount: getPaymentResponse?.data?.amount,
    feeModeCode: fees?.feeMode,
    currencyCode: masterData?.currencyData?.currencyCode,
    paymentStatus: getPaymentResponse?.data?.status,
    discountCode: fees?.discountCode,
    discountAmount: fees.discountFee,
    studentCode: masterData?.applicationData?.studentCode,
    applicationCode: masterData?.applicationData?.applicationCode,
    paymentType: 'ONLINE',
    ukheshe: {
      paymentId: getPaymentResponse?.data?.paymentId,
      gatewayTransactionId: getPaymentResponse?.data?.externalUniqueId,
      amount: getPaymentResponse?.data?.amount,
      status: getPaymentResponse?.data?.status,
      walletId: getPaymentResponse?.data?.walletId,
      currency: getPaymentResponse?.data?.currency,
      externalUniqueId: getPaymentResponse?.data?.externalUniqueId,
      paymentType: getPaymentResponse?.data?.paymentType
    },
    programName: masterData?.programData?.name,
    paymentStatusCode: getPaymentResponse?.data?.status,
    PaymentStatusMessage: 'payment transaction failed'
  }
}

export const changeFileExactions = (files: any, documentCode: string) => {
  const paymentProofPayload: any = []
  files?.forEach((element: any) => {
    const ext = element?.fileName?.split('.').pop()
    paymentProofPayload.push({
      documentTypeCode: element?.documentTypeCode,
      fileName: element?.fileName,
      fileType: `.${ext}`,
      documentCode: documentCode
    })
  })
  
return paymentProofPayload
}
