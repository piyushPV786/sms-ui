// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

import FileDocumentEdit from 'mdi-material-ui/FileDocumentEdit'

import { useForm } from 'react-hook-form'
import { Stack } from '@mui/system'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const ManagementInfo = ({ addDiscount }: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const onSubmitt = async (data: any) => {
    const dataa = {
      managementCode: data.managmentCode,
      percent: data.discountPercent,
      maxAmount: data.discountMaxAmmount,
      validThrough: data.validThrough,
      studentEmail: data.studentEmail,
      studentPhone: data.studentPhone,
      applicationCode: data.applicationCode,
      enrolmentCode: data.enrollmentCode
    }

    addDiscount(dataa)
    setShow(false)
  }

  // ** States
  const [show, setShow] = useState<boolean>(false)

  return (
    <Grid>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          size='small'
          variant='contained'
          onClick={() => setShow(true)}
          sx={{ position: 'absolute' }}
        >
          CHANGE PAYMENT MODE
        </Button>
      </Box>

      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <form>
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton
              size='small'
              onClick={() => setShow(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Close />
            </IconButton>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                CHANGE REQUEST FOR PAYMENT MODE
              </Typography>
            </Box>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                <Typography variant='h6'>current Payment Mode</Typography>
                SEMESTER R(21,00000)
              </Typography>
            </Box>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h6'>Select Payment Mode</Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <RadioGroup name='radio-buttons-group'>
                  <Stack direction='row' spacing={6} sx={{ pl: 50, textAlign: 'center' }}>
                    <Button
                      variant='outlined'
                      color='secondary'

                      //onClick={() => setShow(false)}
                      endIcon={<FormControlLabel value='Monthly' label='' control={<Radio />} />}
                    >
                      MONTHLY
                    </Button>
                    <Button
                      variant='outlined'
                      color='secondary'

                      //onClick={() => setShow(false)}
                      endIcon={<FormControlLabel value='yearly' label='' control={<Radio />} />}
                    >
                      YEARLY
                    </Button>
                  </Stack>
                </RadioGroup>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
            <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
              Discard
            </Button>
            <Button variant='contained' sx={{ mr: 2 }} type='submit'>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default ManagementInfo
