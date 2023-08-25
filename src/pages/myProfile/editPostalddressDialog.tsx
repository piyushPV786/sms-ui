import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid' // Import the Grid component
import { useFormContext } from 'react-hook-form'

// import { Alert } from '@mui/material'

interface IEditPostalAddressDialogProps {
  editDialogOpen: boolean
  handleEditDialogClose: () => void
  onSubmit: (...args: any) => void
}

const EditPostalAddressDialog = ({
  editDialogOpen,
  handleEditDialogClose,
  onSubmit
}: IEditPostalAddressDialogProps) => {
  const {
    register,
    formState: { errors, isDirty }
  } = useFormContext()

  return (
    <>
      <Dialog
        PaperProps={{ style: { minHeight: '500px', minWidth: '700px' } }}
        open={editDialogOpen}
        onClose={handleEditDialogClose}
      >
        <DialogTitle align='center' color='white' style={{ background: '#4f958d', maxHeight: '70px' }}>
          EDIT POSTAL ADDRESS
        </DialogTitle>
        <DialogContent>
          <Grid container marginTop={5} spacing={6}>
            <Grid item xs={12}>
              <TextField
                label='Address ( Area & Street)'
                fullWidth
                {...register('address', { required: true })}
                error={Boolean(errors.city)}
                helperText={errors.address && 'Address is required'}
              />
            </Grid>
          </Grid>
          <Grid container marginTop={5} spacing={6}>
            <Grid item xs={6}>
              {' '}
              <TextField
                label='City'
                fullWidth
                {...register('city', { required: true })}
                error={Boolean(errors.city)}
                helperText={errors.city && 'City is required'}
              />
            </Grid>
            <Grid item xs={6}>
              {' '}
              <TextField
                label='State'
                fullWidth
                {...register('state', { required: true })}
                error={Boolean(errors.state)}
                helperText={errors.state && 'State is required'}
              />
            </Grid>
          </Grid>
          <Grid container marginTop={5} spacing={6}>
            {' '}
            <Grid item xs={6}>
              {' '}
              <TextField
                label='Country'
                fullWidth
                {...register('country', { required: true })}
                error={Boolean(errors.country)}
                helperText={errors.country && 'Country is required'}
              />
            </Grid>
            <Grid item xs={6}>
              {' '}
              <TextField
                label='Pincode or ZipCode'
                fullWidth
                {...register('pincode', { required: true })}
                error={Boolean(errors.pincode)}
                helperText={errors.pincode && 'Pincode is required'}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={handleEditDialogClose}
            style={{ background: 'white', color: 'grey', borderColor: 'grey' }}
          >
            Cancel
          </Button>
          <Button
            style={{ background: '#4f958d', color: 'white' }}
            variant='contained'
            onClick={onSubmit}
            type='submit'
            disabled={!isDirty}
          >
            Save
          </Button>
        </DialogActions>
        {/* {isDirty && <Alert severity='warning'>Unsaved Changes will be lost</Alert>} */}
      </Dialog>
    </>
  )
}

export default EditPostalAddressDialog
