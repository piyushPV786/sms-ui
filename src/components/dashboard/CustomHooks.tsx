import { useEffect, useState } from 'react'
import { status } from 'src/context/common'
import { useAuth } from 'src/hooks/useAuth'
import { CommonService, StudentService } from 'src/service'
import { DDMMYYYDateFormat } from 'src/utils'

const DashboardCustomHooks = () => {
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
  }

  const [scheduler, setScheduler] = useState<any>(null)
  const [myDayData, setMyDay] = useState<any>(null)
  const [profileImage, setProfileImage] = useState<string | undefined>()
  const [studentDetails, setStudentDetails] = useState<studentType>()

  const auth = useAuth()

  useEffect(() => {
    getStudentScheduler()
    getStudentMyDay()
    getStudentDetails()
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

      console.log('schedulerResponse =================>', schedulerResponse)
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

  return { scheduler, myDayData, profileImage, studentDetails }
}

export default DashboardCustomHooks
