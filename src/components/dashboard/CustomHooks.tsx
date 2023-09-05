import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { StudentService } from 'src/service'

const DashboardCustomHooks = () => {
  const [scheduler, setScheduler] = useState<any>(null)
  const auth = useAuth()

  useEffect(() => {
    getStudentScheduler()
  }, [])

  const getStudentScheduler = async () => {
    if (auth?.user?.studentCode) {
      const schedulerResponse = await StudentService?.studentScheduler(auth?.user?.studentCode)
      setScheduler(schedulerResponse)

      console.log('schedulerResponse =================>', schedulerResponse)
    }
  }

  return { scheduler }
}

export default DashboardCustomHooks
