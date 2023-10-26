import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  TextField
} from '@mui/material'
import { HelpBox } from 'mdi-material-ui'
import { useState } from 'react'
import Styles from './RaiseQuery.module.css'
import { useForm } from 'react-hook-form'

const ExamTicket = () => {
  const {
    register,
    watch,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })
  const [open, setOpen] = useState<boolean>(false)
  const category = [
    {
      name: 'bbba-1st Sem'
    }
  ]

  return (
    <Grid>
      <Box display='flex' onClick={() => setOpen(true)}>
        <Box display='contents'>
          <HelpBox />
        </Box>
        <Box pl={1}>Download Exam Ticket</Box>
      </Box>
      <form>
        <Dialog fullWidth maxWidth='sm' open={open}>
          <DialogTitle>
            <Box className={Styles.Title}>Dowload Exam Ticket</Box>
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12} mb={3} marginTop={3}>
              <FormControl fullWidth>
                <Autocomplete
                  fullWidth
                  id='selectExam'
                  {...register('selectExam', { required: 'Exam Name is Required' })}
                  style={{ width: '80%', alignSelf: 'center' }}
                  options={category}
                  value={category?.find(i => i?.name?.toString() == watch('selectExam')?.toString()) ?? null}
                  onChange={(_, value) => {
                    value && setValue('selectExam', value?.name?.toString())
                    clearErrors('selectExam')
                  }}
                  getOptionLabel={option => option.name.toString()}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={
                        <span>
                          Select Exam<span style={{ color: 'red' }}>*</span>
                        </span>
                      }
                      variant='outlined'
                      fullWidth
                    />
                  )}
                />

                <FormHelperText sx={{ color: 'red' }}>{errors.category && errors.category?.message}</FormHelperText>
              </FormControl>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='outlined' color='secondary' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </Grid>
  )
}

export default ExamTicket
