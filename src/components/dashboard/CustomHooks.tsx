import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { StudentService } from 'src/service'
import { DDMMYYYDateFormat } from 'src/utils'

const DashboardCustomHooks = () => {
  const [scheduler, setScheduler] = useState<any>(null)
  const [myDayData, setMyDay] = useState<any>(null)

  const auth = useAuth()

  useEffect(() => {
    getStudentScheduler()
    getStudentMyDay()
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

  return { scheduler, myDayData }
}

export default DashboardCustomHooks
