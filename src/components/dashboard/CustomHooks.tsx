import moment from 'moment'
import { useEffect, useState } from 'react'
import { ISchedule, IScheduleData, status } from 'src/context/common'
import { ICourseList, IProgramList } from 'src/context/types'
import { useAuth } from 'src/hooks/useAuth'
import { AcademicService, CommonService, OperationService, StudentService } from 'src/service'
import { ICommonParams } from 'src/types/dataTypes'
import { DDMMYYYDateFormat } from 'src/utils'

const DashboardCustomHooks = () => {
  interface Iprogram {
    name: string | undefined
    nqfLevel: string | undefined
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
  }

  const [scheduler, setScheduler] = useState<any>(null)
  const [classes, setClasses] = useState<any>(null)
  const [myDayData, setMyDay] = useState<any>(null)
  const [profileImage, setProfileImage] = useState<string | undefined>()
  const [studentDetails, setStudentDetails] = useState<studentType>()
  const [applicationCode, setApplicationCode] = useState<string>('')
  const [paymentStatus, setPaymentStatus] = useState<string>('')
  const [invigilator, setInvigilator] = useState<ICommonParams[]>([])
  const [courseLists, setCourseLists] = useState<ICourseList[]>([])
  const [programList, setProgramList] = useState<IProgramList[]>([])

  const [rollover, setRollover] = useState<{ passedModules: any[]; rollOverModules: any[] }>({
    passedModules: [],
    rollOverModules: []
  })

  const auth = useAuth()

  useEffect(() => {
    getStudentScheduler()
    getStudentMyDay()
    getStudentDetails()
    getRolloverList()
    getApplicationCode()
    getAllInvigilator()
    getProgramList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const courseCode = classes?.classManagementData?.map((item: DataType) => {
    item.courseCode
  })

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
  const startDate: moment.Moment = currentDate.clone().startOf('day')
  const endDate: moment.Moment = currentDate.clone().add(1, 'years')
  const startDateString: string = startDate.format('DD-MM-YYYY')
  const endDateString: string = endDate.format('DD-MM-YYYY')

  const getStudentScheduler = async () => {
    if (auth?.user?.studentCode) {
      const startDate = startDateString
      const endDate = endDateString
      const schedulerResponse = await StudentService?.studentScheduler(auth?.user?.studentCode, startDate, endDate)
      setScheduler(schedulerResponse?.data?.data)

      console.log('schedulerResponse =================>', schedulerResponse)
    }
  }
  const getMyClasses = async () => {
    if (scheduleCode) {
      const classesResponse = await OperationService?.getClass(scheduleCode)
      setClasses(classesResponse)

      console.log('MyClasses Response =================>', classesResponse)
    }
  }

  const getAllInvigilator = async () => {
    const response = await AcademicService.getAllFacilitator()
    setInvigilator(response?.data)
  }

  const getProgramList = async () => {
    const response: Array<IProgramList> = await AcademicService?.getAllProgramList()

    setProgramList(response)
  }

  const getCourseList = async (code: number | string) => {
    const response = await AcademicService?.getProgramListByCode(code)
    await setCourseLists(response?.course)
  }

  const getStudentMyDay = async () => {
    if (auth?.user?.studentCode) {
      const date = DDMMYYYDateFormat(new Date())
      const schedulerResponse = await StudentService?.studentScheduler(auth?.user?.studentCode, date)

      setMyDay(schedulerResponse?.data?.data)
    }
  }

  const getStudentDetails = async () => {
    if (auth?.user?.studentCode) {
      const userProfileResponse = await StudentService?.UserProfile(auth?.user?.studentCode)

      setStudentDetails(userProfileResponse?.data?.data[0])

      if (userProfileResponse?.status === status?.successCode && userProfileResponse?.data?.data) {
        const imgsrc = await CommonService.getProfileSource(
          userProfileResponse?.data?.data[0].documentCode,
          auth?.user?.studentCode
        )
        setProfileImage(imgsrc?.data?.data)
      }
    }
  }

  const getRolloverList = async () => {
    if (auth?.user?.studentCode) {
      const rolloverResponse = await StudentService?.getRolloverList(auth?.user?.studentCode)
      setRollover(rolloverResponse?.data?.data)
    }
  }
  const getApplicationCode = async () => {
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
        filteredData.map((entry: { paymentStatus: string }) => setPaymentStatus(entry.paymentStatus))
      }
    }
  }

  return {
    scheduler,
    myDayData,
    profileImage,
    studentDetails,
    rollover,
    applicationCode,
    paymentStatus,
    classes,
    invigilator,
    programList,
    courseLists
  }
}

export default DashboardCustomHooks
