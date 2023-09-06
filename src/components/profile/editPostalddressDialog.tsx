import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid' // Import the Grid component
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Autocomplete, FormControl, FormHelperText } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'

// import { Alert } from '@mui/material'

interface IEditPostalAddressDialogProps {
  editDialogOpen: boolean
  handleEditDialogClose: () => void
  onSubmit: (...args: any) => void
  getStateData: (...args: any) => void
  countryData: any
  stateData: any
  studentDetails: any
}
const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  country: yup.string().required(),
  state: yup
    .string()
    .min(0, obj => showErrors('state', obj.value.length, obj.min))
    .required(),
  street: yup
    .string()
    .min(3, obj => showErrors('street', obj.value.length, obj.min))
    .required(),
  city: yup
    .string()
    .min(3, obj => showErrors('city', obj.value.length, obj.min))
    .required(),
  zipcode: yup
    .string()
    .min(3, obj => showErrors('zipcode', obj.value.length, obj.min))
    .required()
})

const EditPostalAddressDialog = ({
  editDialogOpen,
  handleEditDialogClose,
  onSubmit,
  getStateData,
  countryData,
  stateData,
  studentDetails
}: IEditPostalAddressDialogProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const countryWatch = watch('country')
  const stateWatch = watch('state')
  const streetWatch = watch('street')
  const cityWatch = watch('city')
  const zipcodeWatch = watch('zipcode')

  useEffect(() => {
    if (studentDetails && studentDetails?.address?.length) {
      const postalAddress = studentDetails?.address?.find((item: any) => item?.addressType === 'POSTAL')
      setValue('country', postalAddress?.country)
      setValue('city', postalAddress?.city)
      setValue('state', postalAddress?.state)
      setValue('street', postalAddress?.street)
      setValue('zipcode', postalAddress?.zipcode)
      if (postalAddress?.country) {
        getStateData(postalAddress?.country)
      }
    }
  }, [studentDetails])

  const onSubmitAddress = async (data: any) => {
    setLoading(true)
    await onSubmit(data)
    setLoading(false)
  }

  return (
    <>
      <Dialog
        PaperProps={{ style: { minHeight: '500px', minWidth: '700px' } }}
        open={editDialogOpen}
        onClose={handleEditDialogClose}
      >
        <form onSubmit={handleSubmit(onSubmitAddress)}>
          <DialogTitle align='center' color='white' style={{ background: '#4f958d', maxHeight: '70px' }}>
            EDIT POSTAL ADDRESS
          </DialogTitle>

          <DialogContent>
            <Grid container marginTop={5} spacing={6}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='street'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <TextField
                        defaultValue={streetWatch}
                        label='Address ( Area & Street)'
                        onChange={onChange}
                        error={Boolean(errors.street)}
                        aria-describedby='validation-schema-name'
                      />
                    )}
                  />
                  {errors.street && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                      {errors.street.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid container marginTop={5} spacing={6}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name='city'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <TextField
                        defaultValue={cityWatch}
                        label='City'
                        onChange={onChange}
                        error={Boolean(errors.city)}
                        aria-describedby='validation-schema-city'
                      />
                    )}
                  />
                  {errors.city && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-city'>
                      {errors.city.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name='country'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <Autocomplete
                        defaultValue={
                          countryWatch ? countryData?.find((item: any) => item?.code === countryWatch) : undefined
                        }
                        onChange={(e, data) => onChange(data?.code)}
                        options={countryData}
                        renderOption={(props, option: any) => <li {...props}>{option?.name}</li>}
                        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                          <TextField {...params} label='Country' error={Boolean(errors.department)} />
                        )}
                        getOptionLabel={(option: any) => {
                          return option?.name
                        }}
                      />
                    )}
                  />
                  {errors.country && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                      {errors.country.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid container marginTop={5} spacing={6}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name='state'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <Autocomplete
                        defaultValue={
                          stateWatch ? stateData?.find((item: any) => item?.isoCode === stateWatch) : undefined
                        }
                        onChange={(e, data) => onChange(data?.name)}
                        options={stateData}
                        renderOption={(props, option: any) => <li {...props}>{option?.name}</li>}
                        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                          <TextField {...params} label='State' error={Boolean(errors.department)} />
                        )}
                        getOptionLabel={(option: any) => {
                          return option?.name
                        }}
                      />
                    )}
                  />
                  {errors.state && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                      {errors.state.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name='zipcode'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <TextField
                        defaultValue={zipcodeWatch}
                        label='Pincode or ZipCode'
                        onChange={onChange}
                        error={Boolean(errors.zipcode)}
                        aria-describedby='validation-schema-city'
                      />
                    )}
                  />
                  {errors.zipcode && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-city'>
                      {errors.zipcode.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loading}
              variant='contained'
              onClick={handleEditDialogClose}
              style={{ background: 'white', color: 'grey', borderColor: 'grey' }}
            >
              Cancel
            </Button>
            <Button style={{ background: '#4f958d', color: 'white' }} variant='contained' type='submit'>
              Save
            </Button>
          </DialogActions>
        </form>
        {/* {isDirty && <Alert severity='warning'>Unsaved Changes will be lost</Alert>} */}
      </Dialog>
    </>
  )
}

export default EditPostalAddressDialog
