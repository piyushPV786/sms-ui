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
import { StudentService } from 'src/service'
import DashboardCustomHooks from '../dashboard/CustomHooks'
import { successToast } from '../common'
import { useAuth } from 'src/hooks/useAuth'
import { EnrollElective, ErrorMessage, ICourseDetails, status } from 'src/context/common'
import { errorToast } from 'src/@core/components/common/Toast'
import Styles from './SelectElective.module.css'

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

interface CoreDataByYear {
  [key: string]: ICourseDetails[]
}
const SelectElective = () => {
  const bgColors = UseBgColor()
  const [dialogShow, setDialogShow] = useState<boolean>(false)

  const auth = useAuth()

  const { module, studentDetails, electiveModule } = DashboardCustomHooks()

  const coreData = module?.data?.filter((item: { type: string }) => item?.type === 'core')
  const electiveData = module?.data?.filter((item: { type: string }) => item?.type === 'elective')
  const electiveEnrolledData = electiveModule?.filter(
    (item: { course: { type: string } }) => item?.course?.type === 'elective'
  )
  let filteredElectiveData: any[] | undefined = undefined

  if (electiveData && electiveEnrolledData) {
    filteredElectiveData = electiveData.filter(
      obj1 => !electiveEnrolledData?.some((obj2: { course: { code: string } }) => obj1?.code === obj2?.course?.code)
    )
  }

  const coreDataByYear: CoreDataByYear = {}
  coreData?.forEach(module => {
    const yearKey = `${module?.academicYearOfProgram}stYear` // Creating keys like '1stYear', '2ndYear', etc.
    if (!coreDataByYear[yearKey]) {
      coreDataByYear[yearKey] = []
    }
    coreDataByYear[yearKey].push(module)
  })

  const Year = (academicYear: number) => {
    return `${academicYear}st year`
  }

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
    if (auth?.user?.studentCode) {
      const electiveParam = {
        username: auth?.user?.studentCode,
        courseCodes: response.module,
        programCode: studentDetails?.program?.code ? studentDetails?.program?.code : ''
      }
      const apiResponse = await StudentService?.enrollElective(electiveParam)
      if (apiResponse?.status === status.successCodeOne) successToast(EnrollElective.enroll)
      else errorToast(ErrorMessage.Error)

      setDialogShow(false)
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
        Select Elective Modules to Enroll 1st Year
      </Typography>
      <Typography color={theme => theme.palette.common.white} fontSize={15} pb={2}>
        You have to choose elective modules for the first year to enroll in the program.
      </Typography>

      <WhiteButton className={Styles.elective} onClick={handleOpen}>
        Elective Enrollments
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
            ELECTIVE ENROLLMENTS
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={6} mt={1}>
              {coreDataByYear &&
                Object?.entries(coreDataByYear)?.map(([year, modules]) => (
                  <Grid item xs={12} key={year}>
                    <Typography fontWeight='bold'>{Year(parseInt(year))} - CORE MODULES</Typography>

                    <Grid mt={1}>
                      {modules?.map(module => (
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
                      ))}
                    </Grid>
                  </Grid>
                ))}

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
                    options={filteredElectiveData ? filteredElectiveData?.filter(Boolean) : []}
                    value={
                      filteredElectiveData &&
                      filteredElectiveData?.filter(
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
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>

            <Button
              variant='contained'
              className={Styles.electiveButton}
              type='submit'

              // disabled={watch('module') && watch('module')[0] !== null}
            >
              Enroll
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default SelectElective
