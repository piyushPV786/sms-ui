// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import {
  Box,
  Grid,
  Dialog,
  Button,
  IconButton,
  DialogActions,
  Typography,
  DialogTitle,
  DialogContentText,
  DialogContent
} from '@mui/material'

// ** Icons Imports
import { ProgressClose } from 'mdi-material-ui'

// ** Third Party Library
import { Delete } from 'mdi-material-ui'
import Tooltip from '@mui/material/Tooltip'
import { successToast } from 'src/@core/components/common/Toast'
import { deleteDocument } from 'src/context/common'

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
      <Dialog maxWidth='md' open={dialogShow} onClose={() => setDialogShow(false)} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 0 }}>
            <ProgressClose color='error' style={{ height: '30%', width: '20%' }} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant='body2'>
            <Typography sx={{ mb: 1, fontWeight: '600', justifyContent: 'center', display: 'flex' }}>
              Are you sure ?
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='inherit'></Typography>
              <p>
                Do you really want to delete these file? This
                <br />
                process cannot be undone
              </p>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='outlined' color='secondary' onClick={() => setDialogShow(false)}>
            Cancel
          </Button>
          <Button variant='contained' color='error' onClick={onSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default DeleteDialog
