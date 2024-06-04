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
import { StudentService } from 'src/service'
import { successToast } from '../common'
import { useAuth } from 'src/hooks/useAuth'
import { ErrorMessage, status } from 'src/context/common'
import { errorToast } from 'src/@core/components/common/Toast'
import Styles from './RollOver.module.css'

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
  module: yup.array().min(1, 'Module are required')
})

const RollOver = ({ rollover, applicationCode, paymentStatus }: any) => {
  const bgColors = UseBgColor()
  const router = useRouter()
  const [dialogShow, setDialogShow] = useState<boolean>(false)

  const auth = useAuth()

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
    const courseCodes = response.module
    if (auth?.user?.studentCode) {
      const apiResponse = await StudentService?.rollover(auth?.user?.studentCode, courseCodes)
      if (apiResponse?.status === status.successCodeOne) successToast('Rollover successfully done.')
      else errorToast(ErrorMessage.Error)

      setDialogShow(false)
    }
  }
  const handlePay = async () => {
    router.push(`/payment/checkout/${applicationCode}?rollover=true`)
  }

  const handleOpen = () => {
    setDialogShow(true)
    reset()
  }
  const handleClose = () => {
    setDialogShow(false)
    reset()
  }
  const PassedModulesByYear: [] = []
  const RolloverModulesByYear: [] = []

  rollover?.passedModules?.reduce((acc: any, data: { academicYearOfProgram: number }) => {
    const year = data?.academicYearOfProgram
    acc[year - 1] = acc[year - 1] || []
    acc[year - 1].push(data)

    return acc
  }, PassedModulesByYear)

  rollover?.rollOverModules?.reduce((acc: any, data: { academicYearOfProgram: number }) => {
    const year = data?.academicYearOfProgram
    acc[year - 1] = acc[year - 1] || []
    acc[year - 1].push(data)

    return acc
  }, RolloverModulesByYear)

  const Year = (year: number) => {
    if (year === 1) return '1st YEAR'
    if (year === 2) return '2nd YEAR'
    if (year === 3) return '3rd YEAR'
    if (year === 4) return '4th YEAR'
    if (year === 5) return '5th YEAR'
    if (year === 6) return '6th YEAR'
  }

  return (
    <Grid>
      <Typography color={theme => theme.palette.warning.main} fontSize='large'>
        To Rollover
      </Typography>
      <Typography color={theme => theme.palette.common.white} fontSize={15} pb={2}>
        You have passed the dependent modules. Please pay the R 500 and admission fee to roll over next semester.
      </Typography>
      <WhiteButton
        disabled={paymentStatus === 'SUCCESSFUL'}
        className={Styles.payRollOver}
        onClick={() => {
          handlePay()
        }}
      >
        PAY Rollover Fee
      </WhiteButton>
      <WhiteButton disabled={paymentStatus !== 'SUCCESSFUL'} className={Styles.rollOver} onClick={handleOpen}>
        Roll Over
      </WhiteButton>
      <Dialog
        open={dialogShow}
        maxWidth='sm'
        fullWidth
        scroll='body'
        onClose={(event, reason) => {
          reason !== 'backdropClick' && setDialogShow(false)
        }}
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
              {PassedModulesByYear.length > 0 &&
                PassedModulesByYear?.map((data: [], id: number) => {
                  return (
                    <>
                      {data?.length > 0 && (
                        <Grid item key={id} xs={12}>
                          {data?.map((module: { name: string }, index) => {
                            return (
                              <>
                                <Typography fontWeight='bold'>{Year(index + 1)} - COMPLETED MODULES</Typography>
                                {module && (
                                  <Grid mt={1}>
                                    <Chip
                                      key={module?.name}
                                      skin='light'
                                      size='small'
                                      label={module?.name}
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
                                )}
                              </>
                            )
                          })}
                        </Grid>
                      )}
                    </>
                  )
                })}
              {RolloverModulesByYear.length > 0 &&
                RolloverModulesByYear.map((data: [], id) => {
                  return (
                    <>
                      {data?.length > 0 && (
                        <Grid item key={id} xs={12}>
                          {data?.map((module: { name: string }, index) => {
                            return (
                              <>
                                <Typography fontWeight='bold'>{Year(index + 1)} - ROLLOVER MODULES</Typography>
                                {module && (
                                  <Grid mt={1}>
                                    <Chip
                                      key={module?.name}
                                      skin='light'
                                      size='small'
                                      label={module?.name}
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
                                )}
                              </>
                            )
                          })}
                        </Grid>
                      )}
                    </>
                  )
                })}
              <Grid item xs={12}>
                <Typography mb={3} variant='body2'>
                  ELECTIVES
                </Typography>
                <FormControl fullWidth>
                  <Autocomplete
                    {...register('module', { required: 'Module are required' })}
                    multiple
                    onChange={(_, value) => {
                      value &&
                        setValue(
                          'module',
                          value?.map(i => i?.code)
                        )
                      clearErrors('module')
                    }}
                    options={rollover?.rollOverModules.filter(Boolean)}
                    value={
                      rollover &&
                      rollover?.rollOverModules?.filter(
                        (i: { name: string; code: string }) => i && watch('module').includes(i?.code)
                      )
                    }
                    getOptionLabel={option => option?.name && option?.name}
                    filterSelectedOptions
                    renderInput={params => <TextField {...params} label='Select Elective Modules' />}
                    sx={{
                      '.MuiChip-root.MuiAutocomplete-tag': {
                        backgroundColor: bgColors.successLight.backgroundColor,
                        color: bgColors.successLight.color
                      }
                    }}
                  />
                  <FormHelperText error>{errors?.module && 'Module are required'}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={Styles.dialogAction}>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>

            <Button
              variant='contained'
              className={Styles.rolloverButton}
              type='submit'
              disabled={watch('module') && watch('module')[0] !== null}
            >
              Rollover
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default RollOver
