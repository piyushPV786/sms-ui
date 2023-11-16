import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  FadeProps,
  Grid,
  Typography,
  FormControl,
  Autocomplete,
  TextField,
  DialogActions,
  Button
} from '@mui/material'
import React, { ReactElement, Ref, forwardRef, useState } from 'react'
import WhiteButton from '../Button'
import Chip from 'src/@core/components/mui/chip'
import FormHelperText from '@mui/material/FormHelperText'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import UseBgColor from 'src/@core/hooks/useBgColor'
import { useRouter } from 'next/router'
import { FinanceService } from 'src/service'
import DashboardCustomHooks from '../dashboard/CustomHooks'
import { YYYYMMDDDateFormat } from 'src/utils'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface IFormValue {
  module: string[]
}

const schema = yup.object().shape({
  module: yup.array().min(2, 'Two module are required')
})

const RollOver = () => {
  const bgColors = UseBgColor()
  const router = useRouter()
  const [dialogShow, setDialogShow] = useState<boolean>(false)

  const { studentDetails, rollover, applicationCode } = DashboardCustomHooks()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    clearErrors,
    formState: { errors }
  } = useForm<IFormValue>({
    defaultValues: {
      module: []
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (response: IFormValue) => {
    if (studentDetails) {
      const response1 = await FinanceService?.getCurrencyRate(studentDetails.nationality)
      console.log('response', response)

      const amount = 500
      const feeModeCode = 'Rollover'
      const currencyCode = response1 && response1?.data?.data?.currencyCode
      const dueDate = YYYYMMDDDateFormat(new Date())
      router.push(
        `/payment/checkout/${amount}/${feeModeCode}/${currencyCode}/${dueDate}/${applicationCode}?rollover=true`
      )
    }
  }

  const handleOpen = () => {
    setDialogShow(true)
    reset()
  }
  const handleClose = () => {
    setDialogShow(false)
    reset()
  }

  return (
    <Grid>
      <Typography color={theme => theme.palette.warning.main} fontSize='large'>
        To Rollover
      </Typography>
      <Typography color={theme => theme.palette.common.white} fontSize={15} pb={2}>
        You have passed the dependent modules. Please pay the 500 and admission fee to roll over next semester.
      </Typography>
      <WhiteButton onClick={handleOpen}>Roll Over</WhiteButton>
      <Dialog
        open={dialogShow}
        maxWidth='sm'
        fullWidth
        scroll='body'
        onClose={() => setDialogShow(false)}
        TransitionComponent={Transition}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            display='flex'
            justifyContent='center'
            fontWeight='bold'
            color={theme => theme.palette.primary.main}
            bgcolor='#c5e3d9'
          >
            ROLLOVER
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={6} mt={1}>
              {rollover.passedModules?.map(
                (data: { name: string; code: string; academicYearOfProgram: number }, id) => {
                  return (
                    <Grid item key={id} xs={12}>
                      {data?.academicYearOfProgram === 5 ? (
                        <Typography fontWeight='bold'>5th YEAR - COMPLETED MODULES</Typography>
                      ) : data?.academicYearOfProgram === 2 ? (
                        <Typography fontWeight='bold'>2nd YEAR - COMPLETED MODULES</Typography>
                      ) : data?.academicYearOfProgram === 3 ? (
                        <Typography fontWeight='bold'>3rd YEAR - COMPLETED MODULES</Typography>
                      ) : data?.academicYearOfProgram === 4 ? (
                        <Typography fontWeight='bold'>4th YEAR - COMPLETED MODULES</Typography>
                      ) : (
                        <Typography fontWeight='bold'>1st YEAR - COMPLETED MODULES</Typography>
                      )}
                      <Grid mt={1}>
                        <Chip
                          key={data.name}
                          skin='light'
                          size='small'
                          label={data.name}
                          color='success'
                          sx={{
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { lineHeight: '18px' },
                            borderRadius: '10px',
                            boxShadow: '2px 4px 4px 0px #9f9f9f75',
                            margin: '4px'
                          }}
                        />
                      </Grid>
                    </Grid>
                  )
                }
              )}
              {rollover.rollOverModules?.map(
                (data: { name: string; code: string; academicYearOfProgram: number }, id) => {
                  return (
                    <Grid item key={id} xs={12}>
                      {data?.academicYearOfProgram === 5 ? (
                        <Typography fontWeight='bold'>5th YEAR - ROLLOVER MODULES</Typography>
                      ) : data?.academicYearOfProgram === 2 ? (
                        <Typography fontWeight='bold'>2nd YEAR - ROLLOVER MODULES</Typography>
                      ) : data?.academicYearOfProgram === 3 ? (
                        <Typography fontWeight='bold'>3rd YEAR - ROLLOVER MODULES</Typography>
                      ) : data?.academicYearOfProgram === 4 ? (
                        <Typography fontWeight='bold'>4th YEAR - ROLLOVER MODULES</Typography>
                      ) : (
                        <Typography fontWeight='bold'>1st YEAR - ROLLOVER MODULES</Typography>
                      )}

                      <Grid mt={1}>
                        <Chip
                          key={data?.name}
                          skin='light'
                          size='small'
                          label={data?.name}
                          color='success'
                          sx={{
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { lineHeight: '18px' },
                            borderRadius: '10px',
                            boxShadow: '2px 4px 4px 0px #9f9f9f75',
                            margin: '4px'
                          }}
                        />
                      </Grid>
                    </Grid>
                  )
                }
              )}
              <Grid item xs={12}>
                <Typography mb={3} variant='body2'>
                  ELECTIVES: CHOICE OF TWO
                </Typography>
                <FormControl fullWidth>
                  <Autocomplete
                    {...register('module', { required: 'module are required' })}
                    multiple
                    onChange={(_, value) => {
                      value &&
                        setValue(
                          'module',
                          value?.map(i => i?.code)
                        )
                      clearErrors('module')
                    }}
                    options={rollover?.rollOverModules}
                    value={rollover?.rollOverModules?.filter((i: { name: string; code: string }) =>
                      watch('module').includes(i?.code)
                    )}
                    getOptionLabel={option => option?.name}
                    filterSelectedOptions
                    renderInput={params => <TextField {...params} label='Select Elective Modules' />}
                    sx={{
                      '.MuiChip-root.MuiAutocomplete-tag': {
                        backgroundColor: bgColors.successLight.backgroundColor,
                        color: bgColors.successLight.color
                      }
                    }}
                  />

                  <FormHelperText error>{errors?.module && 'Two module are required'}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' sx={{ mr: 2 }} type='submit'>
              PAY & ENROLL
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default RollOver
