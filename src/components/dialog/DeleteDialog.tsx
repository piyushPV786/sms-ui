// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

//**  API Services

// ** MUI Imports
import {
  Alert,
  Snackbar,
  Box,
  Grid,
  Dialog,
  Button,
  IconButton,
  DialogContent,
  DialogActions,
  Fade,
  Typography
} from '@mui/material'
import { FadeProps } from '@mui/material/Fade'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Library
import { Delete } from 'mdi-material-ui'
import Tooltip from '@mui/material/Tooltip'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

// const schema = yup.object().shape({
//     name: yup.string().required('Program Name is Required'),
//     code: yup.string().required('Short Code is Required'),
//     nqfLevel: yup.string().required('NQF Level is Required'),
//     noOfYear: yup.number().required('Number Of Years is Required'),
//     category: yup.string().required('Category is Required')
// })

const DeleteDialog = () => {
  // ** States
  const [dialogShow, setDialogShow] = useState<boolean>(false)
  const [snackbarShow, setSnackbarShow] = useState<boolean>(false)

  const onSubmit = () => {
    setSnackbarShow(true)
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
          <DialogContent sx={{ pb: 6, px: { xs: 5 }, pt: { xs: 8 }, position: 'relative' }}>
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
          </DialogContent>
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
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={snackbarShow}
        onClose={() => setSnackbarShow(false)}
        key={'bottom'}
      >
        <Alert onClose={() => setSnackbarShow(false)} severity='success' sx={{ width: '100%' }}>
          Program details saved successfully.
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default DeleteDialog
