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
import React, { ReactElement, Ref, forwardRef, useEffect, useState } from 'react'
import WhiteButton from '../Button'
import Chip from 'src/@core/components/mui/chip'
import FormHelperText from '@mui/material/FormHelperText'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import UseBgColor from 'src/@core/hooks/useBgColor'
import { AcademicService, ApplyService, StudentService } from 'src/service'
import { successToast } from '../common'
import { useAuth } from 'src/hooks/useAuth'
import { EnrollElective, ErrorMessage, ICourseDetails, status } from 'src/context/common'
import { errorToast } from 'src/@core/components/common/Toast'
import Styles from './SelectElective.module.css'
import { useQuery } from '@tanstack/react-query'

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
const SelectElective = ({ module, studentDetails, electiveModule, getElectiveModuleList }: any) => {
  const bgColors = UseBgColor()
  const [dialogShow, setDialogShow] = useState<boolean>(false)
  const [electiveCount, setElectiveCount] = useState<number>(0)
  const auth = useAuth()
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { studentCode }: any = useAuth()?.user
  const { data: studentDetail } = useQuery({
    queryKey: ['studentData', studentCode],
    queryFn: () => ApplyService?.getStudentDetail(studentCode),
    refetchOnWindowFocus: false
  })

  const coreData = module?.filter((item: { type: string }) => item?.type === 'core')
  const electiveData = module?.filter((item: { type: string }) => item?.type === 'elective')
  const electiveEnrolledData = electiveModule?.filter(
    (item: { course: { type: string } }) => item?.course?.type === 'elective'
  )

  let filteredElectiveData: any[] | undefined = undefined

  if (electiveData && electiveEnrolledData) {
    filteredElectiveData = electiveData.filter(
      (obj1: { code: string }) =>
        !electiveEnrolledData?.some((obj2: { course: { code: string } }) => obj1?.code === obj2?.course?.code)
    )
  }

  const coreDataByYear: CoreDataByYear = {}
  function getYearSuffix(year: number) {
    if (year % 10 === 1 && year !== 11) {
      return 'st'
    } else if (year % 10 === 2 && year !== 12) {
      return 'nd'
    } else if (year % 10 === 3 && year !== 13) {
      return 'rd'
    } else {
      return 'th'
    }
  }

  coreData?.forEach((module: ICourseDetails) => {
    const yearKey = `${module?.academicYearOfProgram}${getYearSuffix(Number(module?.academicYearOfProgram))}Year` // Creating keys like '1stYear', '2ndYear', etc.
    if (!coreDataByYear[yearKey]) {
      coreDataByYear[yearKey] = []
    }
    coreDataByYear[yearKey].push(module)
  })

  const Year = (academicYear: number) => {
    return `${academicYear}${getYearSuffix(academicYear)}year`
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<IFormValue>({
    defaultValues: {
      module: []
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const getStudentAcedamicYear = async () => {
    const programCode: string = studentDetails?.program?.code
    const apiResponse = await AcademicService?.getStudentAcedamicYearData(programCode)
    if (apiResponse?.status === 200) {
      const yearAllData = apiResponse?.data?.data
      const currentYear = new Date().getFullYear()
      const getYearCount =
        yearAllData &&
        yearAllData?.length > 0 &&
        yearAllData.find((item: any) => item?.academicYearOfStudy === currentYear)

      return parseInt(getYearCount?.academicYearOfProgram)
    }
  }

  const getElectiveCount = async (studentDetails: any) => {
    const enrolledYear = studentDetail?.enrolment?.enrolmentDate?.split('-')[0]
    const programDetails = await AcademicService?.getProgramDetails(studentDetails?.program?.code)
    const courseCount: any = programDetails?.courseCount.find((item: any) => item?.startYear == enrolledYear)
    const totalYearCount = await getStudentAcedamicYear()
    const yearwiseCourseCount = courseCount?.yearwiseCourseCount?.find(
      (item: any) => item?.academicYear == totalYearCount
    )
    setElectiveCount(parseInt(yearwiseCourseCount?.elective))
  }

  useEffect(() => {
    if (studentDetails && studentDetail) {
      getStudentAcedamicYear()
      getElectiveCount(studentDetails)
    }
  }, [studentDetails, studentDetail])

  const onSubmit = async (response: IFormValue) => {
    if (auth?.user?.studentCode) {
      const electiveParam = {
        username: auth?.user?.studentCode,
        courseCodes: response.module,
        programCode: studentDetails?.program?.code ? studentDetails?.program?.code : ''
      }
      const apiResponse = await StudentService?.enrollElective(electiveParam)
      if (apiResponse?.status === status.successCodeOne) {
        getElectiveModuleList()
        successToast(EnrollElective.enroll)
      } else errorToast(ErrorMessage.Error)

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

  const handleChange = (_: any, value: any) => {
    if (value?.length <= electiveCount) {
      setValue(
        'module',
        value.map((i: any) => i?.code)
      )
      clearErrors('module')
    } else {
      setError('module', {
        type: 'custom',
        message: `you can not select elective module more then ${electiveCount}`
      })
    }
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
                  {coreDataByYear &&
                    Object?.entries(coreDataByYear)?.map(([year]) => (
                      <Grid item xs={12} key={year}>
                        <Typography fontWeight='bold'>{Year(parseInt(year))} - ELECTIVES</Typography>

                        <Grid mt={1}>
                          {electiveEnrolledData?.map((module: any) => {
                            return (
                              <Chip
                                key={module?.course?.name}
                                skin='light'
                                size='small'
                                label={module?.course?.name}
                                color='warning'
                                sx={{
                                  textTransform: 'capitalize',
                                  '& .MuiChip-label': { lineHeight: '18px' },
                                  borderRadius: '10px',
                                  boxShadow: '2px 4px 4px 0px #9f9f9f75',
                                  margin: '4px'
                                }}
                              />
                            )
                          })}
                        </Grid>
                      </Grid>
                    ))}
                </Typography>
                <FormControl fullWidth>
                  <Autocomplete
                    {...register('module', { required: 'Module are required' })}
                    multiple
                    onChange={handleChange}
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
                  <FormHelperText error>{errors?.module && errors?.module?.message}</FormHelperText>
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
