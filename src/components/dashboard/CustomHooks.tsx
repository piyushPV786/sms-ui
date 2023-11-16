import { useEffect, useState } from 'react'
import { status } from 'src/context/common'
import { useAuth } from 'src/hooks/useAuth'
import { CommonService, StudentService } from 'src/service'
import { DDMMYYYDateFormat } from 'src/utils'

const DashboardCustomHooks = () => {
  interface Iprogram {
    name: string | undefined
    nqfLevel: string | undefined
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
  const [myDayData, setMyDay] = useState<any>(null)
  const [profileImage, setProfileImage] = useState<string | undefined>()
  const [studentDetails, setStudentDetails] = useState<studentType>()
  const [applicationCode, setApplicationCode] = useState<string>('')
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
  }, [])

  const getStudentScheduler = async () => {
    if (auth?.user?.studentCode) {
      const schedulerResponse = await StudentService?.studentScheduler(auth?.user?.studentCode)
      setScheduler(schedulerResponse?.data?.data)

      console.log('schedulerResponse =================>', schedulerResponse)
    }
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

      console.log('rolloverResponse =================>', rolloverResponse)
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
      }
    }
  }

  return { scheduler, myDayData, profileImage, studentDetails, rollover, applicationCode }
}

export default DashboardCustomHooks
