import { useState } from 'react'
import {
  APPLICATION_STATUS,
  BURSARY_BUTTON_STATUS,
  CommonEnums,
  UPLOAD_DOCUMENT_BUTTON_STATUS
} from 'src/components/common/Constants'
import { ApplyService } from 'src/service'

const UseCardActionHook = (applicationDetail: any) => {
  const { status, education, document } = applicationDetail

  const [openCredentialDialog, setOpenCredentialDialog] = useState(false)

  const [rmatOpen, setRmatOpen] = useState({
    state: false,
    rmaturl: '',
    password: '',
    username: ''
  })

  const getRmatDetails = async () => {
    const response = await ApplyService.getRmatDetails(applicationDetail?.applicationCode)
    setRmatOpen({
      state: true,
      rmaturl: response?.url,
      password: response?.password,
      username: response?.username
    })
  }

  const isEditBTN =
    status === CommonEnums.FEES_PENDING_STATUS ||
    status === CommonEnums.APP_FEE_DOC_VER_PEND ||
    status === CommonEnums.DRAFT_STATUS ||
    status === CommonEnums.APP_ENROLLED_ACCEPTED

  const isRmatBTN = status === CommonEnums.RMAT_PENDING

  const isPayBTN =
    status === CommonEnums.RESUB_APP_FEE_PROOF ||
    status === CommonEnums.APP_ENROLLED_ACCEPTED ||
    status === APPLICATION_STATUS.APPLICATION_FEE_PENDING ||
    status === APPLICATION_STATUS?.MONTHLY_PAYMENT_REJECT

  const payBtnTitle =
    status === CommonEnums.APP_ENROLLED_ACCEPTED || status === APPLICATION_STATUS?.MONTHLY_PAYMENT_REJECT
      ? 'Pay Qualification Fee'
      : 'Pay Application Fee'

  const isUploadBTN = UPLOAD_DOCUMENT_BUTTON_STATUS.includes(status)

  const isUploadBTNTitle =
    status === CommonEnums.BURSARY_LETTER_PEND && education?.studentTypeCode === CommonEnums?.BURSARY
      ? 'Upload Bursary Letter'
      : 'Upload Documents'

  const isBursaryBTN = BURSARY_BUTTON_STATUS.includes(status) && education?.studentTypeCode === CommonEnums?.BURSARY
  const isAdamiteBTN = status === CommonEnums.PROG_ADMITTED
  const documentDataTypes = [CommonEnums.ACCEPTANCE_LETTER, CommonEnums.WELCOME_LETTER, CommonEnums.QUOTE]
  const documentData = document?.filter(
    (item: any) =>
      (item?.documentTypeCode === CommonEnums.CONFIRMATION_LETTER && status === CommonEnums?.PROG_ADMITTED) ||
      documentDataTypes.includes(item?.documentTypeCode)
  )

  return {
    isEditBTN,
    isRmatBTN,
    isUploadBTNTitle,
    isPayBTN,
    payBtnTitle,
    isUploadBTN,
    isBursaryBTN,
    isAdamiteBTN,
    documentData,
    openCredentialDialog,
    setOpenCredentialDialog,
    rmatOpen,
    getRmatDetails,
    setRmatOpen
  }
}

export default UseCardActionHook
