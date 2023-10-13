import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { CloseCircleOutline } from 'mdi-material-ui'
import { IPaymentResponse } from 'src/types/common'

interface IParams {
  open: boolean
  onClose: () => void
  paymentResponse: IPaymentResponse
}

const UkheshePaymentModal = ({ open, onClose, paymentResponse }: IParams) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <IconButton
        edge='end'
        color='inherit'
        onClick={onClose}
        aria-label='close'
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseCircleOutline />
      </IconButton>
      <DialogContent>
        <iframe
          src={paymentResponse?.completionUrl}
          title='Third-Party Content'
          width='100%'
          height='500px'
          frameBorder='0'
        />
      </DialogContent>
    </Dialog>
  )
}

export default UkheshePaymentModal
