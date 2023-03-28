// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

//**  API Services

// ** MUI Imports
import { Box, Grid, Dialog, Button, IconButton, DialogActions, Fade, Typography } from '@mui/material'
import { FadeProps } from '@mui/material/Fade'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Library
import { Delete } from 'mdi-material-ui'
import Tooltip from '@mui/material/Tooltip'
import { successToast } from 'src/@core/components/common/Toast'
import { deleteDocument } from 'src/context/common'
import { PopupDialog } from 'src/styles/styled'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DeleteDialog = () => {
  // ** States
  const [dialogShow, setDialogShow] = useState<boolean>(false)

  const onSubmit = () => {
    successToast(deleteDocument.delete)
    setDialogShow(false)
  }

  return (
    <Grid>
      <Box display='flex' justifyContent='flex-end'>
        <Tooltip title='Delete'>
          <Box>
            <IconButton
              size='small'
              component='a'
              sx={{ textDecoration: 'none', mr: 0.5, color: 'red' }}
              onClick={() => setDialogShow(true)}
            >
              <Delete />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>

      <Dialog
        fullWidth
        open={dialogShow}
        maxWidth='sm'
        scroll='body'
        onClose={() => setDialogShow(false)}
        TransitionComponent={Transition}
      >
        <form onSubmit={onSubmit}>
          <PopupDialog>
            <IconButton
              size='small'
              onClick={() => setDialogShow(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Close />
            </IconButton>
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Typography variant='h4' sx={{ lineHeight: '2rem' }}>
                Are You Sure ?
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='inherit'></Typography>
              <p>
                Do you really want to delete these file? This
                <br />
                process cannot be undone
              </p>
            </Box>
          </PopupDialog>
          <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
            <Button variant='outlined' color='secondary' onClick={() => setDialogShow(false)}>
              Cancle
            </Button>
            <Button variant='contained' color='error' sx={{ mr: 2 }} onClick={onSubmit}>
              Delete
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default DeleteDialog
