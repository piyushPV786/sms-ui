import moment from 'moment'
import { useEffect, useState } from 'react'
import { ICourseDetails, ISchedule, IScheduleData, status } from 'src/context/common'
import { ICourseList, IProgramList } from 'src/context/types'
import { useAuth } from 'src/hooks/useAuth'
import { AcademicService, CommonService, OperationService, StudentService } from 'src/service'
import { commonListTypes } from 'src/types/dataTypes'

interface Iprogram {
  name: string | undefined
  nqfLevel: string | undefined
  code?: string
}

interface DataType {
  courseCode: string | number
  programCode: string
  facilitator: string
  name: string
  program: string
  date: string
  time: string
  imgSrc: string
}
interface studentType {
  firstName: string
  lastName: string
  email: string
  mobileNo: string
  studentCode: string
  idNo: string
  dateOfBirth: string | any
  qualifications: string | undefined
  nqfLevel: string | undefined
  createdAt: string
  status: string
  program: Iprogram
  nationality: string
  identificationNumber: string
  application: [{ status: string }]
  isActive: boolean
}

const DashboardCustomHooks = () => {
  const [scheduler, setScheduler] = useState<any>(null)
  const [classes, setClasses] = useState<any>(null)
  const [profileImage, setProfileImage] = useState<string | undefined>()
  const [studentDetails, setStudentDetails] = useState<studentType>()
  const [applicationCode, setApplicationCode] = useState<string>('')
  const [paymentStatus, setPaymentStatus] = useState<string>('')
  const [invigilator, setInvigilator] = useState<commonListTypes[]>([])
  const [courseList, setCourseList] = useState<ICourseList[]>([])
  const [programList, setProgramList] = useState<IProgramList[]>([])
  const [module, setModule] = useState<ICourseDetails[]>()
  const [electiveModule, setElectiveModule] = useState<any>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [courseCode, setCourseCode] = useState<string>('')

  const [rollover, setRollover] = useState<{ passedModules: any[]; rollOverModules: any[] }>({
    passedModules: [],
    rollOverModules: []
  })

  const auth = useAuth()

  useEffect(() => {
    getStudentScheduler()
    getStudentDetails()
    getRolloverList()
    getApplicationCode()
    getAllInvigilator()
    getProgramList()
    getElectiveModuleList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    studentDetails?.program && getModuleList()
  }, [studentDetails])

  useEffect(() => {
    getCourseList(courseCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let scheduleCode = ''
  scheduler?.map((data: IScheduleData) => {
    data?.courseSchedule?.map((i: ISchedule) => {
      scheduleCode = `${scheduleCode}${i.code}`
    })
  })

  useEffect(() => {
    if (scheduleCode) getMyClasses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleCode])

  // Get the current Week
  const currentDate: moment.Moment = moment()
  const startDate: moment.Moment = currentDate.clone().startOf('year')
  const endDate: moment.Moment = currentDate.clone().endOf('year')
  const startDateString: string = startDate.format('DD-MM-YYYY')
  const endDateString: string = endDate.format('DD-MM-YYYY')

  const getStudentScheduler = async () => {
    setLoading(true)
    if (auth?.user?.studentCode) {
      const startDate = startDateString
      const endDate = endDateString
      const schedulerResponse = await StudentService?.studentScheduler(auth?.user?.studentCode, startDate, endDate)
      setScheduler(schedulerResponse?.data?.data)
    }
    setLoading(false)
  }
  const getMyClasses = async () => {
    if (scheduleCode) {
      const classesResponse = await OperationService?.getClass(scheduleCode)
      setCourseCode(
        classesResponse?.classManagementData?.map((item: DataType) => {
          item.courseCode
        })
      )
      setClasses(classesResponse)
    }
  }

  const getAllInvigilator = async () => {
    setLoading(true)
    const response = await AcademicService.getAllFacilitator()
    setInvigilator(response?.data)
    setLoading(false)
  }

  const getProgramList = async () => {
    setLoading(true)
    const response: Array<IProgramList> = await AcademicService?.getAllProgramList()

    setProgramList(response)
    setLoading(false)
  }

  const getCourseList = async (code: number | string) => {
    setLoading(true)
    const response = await AcademicService.getProgramListByCode(code)
    await setCourseList(response?.course)
    setLoading(false)
  }

  const getStudentDetails = async () => {
    setLoading(true)
    if (auth?.user?.studentCode) {
      const userProfileResponse = await StudentService?.UserProfile(auth?.user?.studentCode)
      setStudentDetails(userProfileResponse?.data?.data)
      if (userProfileResponse?.status === status?.successCode && userProfileResponse?.data?.data) {
        const imgsrc = await CommonService.getProfileSource(
          userProfileResponse?.data?.data.documentCode,
          auth?.user?.studentCode
        )
        setProfileImage(imgsrc?.data?.data)
      }
    }
    setLoading(false)
  }

  const getRolloverList = async () => {
    setLoading(true)
    if (auth?.user?.studentCode) {
      const rolloverResponse = await StudentService?.getRolloverList(auth?.user?.studentCode)
      setRollover(rolloverResponse?.data?.data)
    }
    setLoading(false)
  }
  const getApplicationCode = async () => {
    setLoading(true)
    if (auth?.user?.studentCode) {
      const payload = {
        q: '',
        pageSize: 10,
        pageNumber: 1
      }
      const response = await StudentService?.getFeePaymentList(payload, auth?.user?.studentCode)

      if (response?.data?.statusCode === status.successCode && response?.data?.data) {
        setApplicationCode(response?.data?.data?.data[0]?.applicationCode)
        const filteredData = response?.data?.data?.data?.filter(
          (entry: { feeModeCode: string }) => entry.feeModeCode === 'Rollover'
        )

        filteredData?.map((entry: { paymentStatus: string }) => setPaymentStatus(entry.paymentStatus))
      }
    }
    setLoading(false)
  }

  const getModuleList = async () => {
    setLoading(true)
    const params = {
      programCode: studentDetails?.program?.code ? studentDetails?.program?.code : ''
    }
    const response = await AcademicService?.getModuleList(params)
    setModule(response?.data?.data)
    setLoading(false)
  }

  const getElectiveModuleList = async () => {
    setLoading(true)
    if (auth?.user?.studentCode) {
      const electiveResponse = await AcademicService?.getElectiveModule(auth?.user?.studentCode)
      setElectiveModule(electiveResponse?.data?.data)
    }
    setLoading(false)
  }

  return {
    scheduler,
    profileImage,
    studentDetails,
    rollover,
    applicationCode,
    paymentStatus,
    classes,
    invigilator,
    programList,
    courseList,
    module,
    electiveModule,
    getElectiveModuleList,
    isLoading
  }
}

export default DashboardCustomHooks
