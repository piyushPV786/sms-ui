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
          sx={{ position: 'absolute', backgroundColor: 'white', color: '#018A77', borderColor: '#018564' }}
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
        <Box sx={{ background: '#DBE7E3', height: 50, alignItems: "center", justifyContent: "center" }} display="flex" >
          <Typography variant='h6'  >
            CHANGE REQUEST FOR PAYMENT MODE
          </Typography>
          {/* <Button> CHANGE REQUEST FOR PAYMENT MODE</Button> */}
        </  Box>
        <DialogContent >

          <form>

            <Box sx={{ mb: 20, textAlign: 'center', mt: 5 }}>
              <Typography sx={{ fontSize: 14 }}>current Payment Mode</Typography>
              <Typography sx={{ mb: 3, lineHeight: '2rem', fontWeight: "bold", fontSize: 16 }}>
                SEMESTER R(21,00000)
              </Typography>

            </Box>

            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Typography variant='h6'>Select Payment Mode</Typography>


            </Box>

            <Grid container xs={12} spacing={6} >

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

                <RadioGroup name='radio-buttons-group'>
                  <Stack direction='row' spacing={6}>

                    <Button
                      variant='outlined'
                      color='secondary'
                      //onClick={() => setShow(false)}
                      endIcon={<FormControlLabel value='Monthly' label='' sx={{ justifySelf: "flex-end" }} control={<Radio />} />}
                    >
                      <Typography sx={{ paddingBottom: 5, fontSize: 10, paddingRight: 5 }}> MONTHLY</Typography>
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

            <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
              <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
                Discard
              </Button>
              <Button variant='contained' sx={{ mr: 2 }} type='submit'>
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Grid >
  )
}

export default ManagementInfo
