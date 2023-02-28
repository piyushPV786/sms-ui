// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'

import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports

import { Stack } from '@mui/system'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const ManagementInfo = () => {
  // ** States
  const [show, setShow] = useState<boolean>(false)

  return (
    <Grid>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          size='small'
          variant='outlined'
          onClick={() => setShow(true)}
          sx={{
            position: 'absolute',
            backgroundColor: theme => theme.palette.common.white,
            color: theme => theme.palette.primary.light,
            borderColor: theme => theme.palette.primary.light
          }}
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
        <Box sx={{ background: '#DBE7E3', height: 50, alignItems: 'center', justifyContent: 'center' }} display='flex'>
          <Typography variant='h6' sx={{ color: theme => theme.palette.primary.main }}>
            CHANGE REQUEST FOR PAYMENT MODE
          </Typography>
        </Box>
        <DialogContent>
          <form>
            <Box sx={{ mb: 20, textAlign: 'center', mt: 5 }}>
              <Typography sx={{ fontSize: 14, pb: '10px' }}>current Payment Mode</Typography>
              <Typography sx={{ mb: 3, lineHeight: '2rem', fontWeight: 'bold', fontSize: 16 }}>
                SEMESTER R(21,00000)
              </Typography>
            </Box>

            <Box sx={{ mb: 5, textAlign: 'center' }}>
              <Typography variant='h6'>Select Payment Mode</Typography>
            </Box>

            <Grid container xs={12} spacing={6} sx={{ pb: '20px' }}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <RadioGroup name='radio-buttons-group'>
                  <Stack direction='row' spacing={6}>
                    <Button
                      variant='outlined'
                      color='secondary'

                      //onClick={() => setShow(false)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography sx={{ fontWeight: 'bold', fontSize: 16, pb: '7px' }}> Monthly</Typography>
                          <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}> R 3670.0</Typography>
                        </Box>
                        <Box justifySelf='end'>
                          {' '}
                          <FormControlLabel value='Monthly' sx={{ margin: 0 }} label='' control={<Radio />} />
                        </Box>
                      </Box>
                    </Button>
                    <Button
                      variant='outlined'
                      color='secondary'

                      //onClick={() => setShow(false)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography sx={{ fontWeight: 'bold', fontSize: 16, pb: '7px' }}> Yearly</Typography>
                          <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}> R 40000.0</Typography>
                        </Box>
                        <Box>
                          <FormControlLabel value='Yearly' label='' sx={{ margin: 0 }} control={<Radio />} />
                        </Box>
                      </Box>
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
    </Grid>
  )
}

export default ManagementInfo
