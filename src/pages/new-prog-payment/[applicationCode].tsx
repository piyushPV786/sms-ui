// ** Demo Components Imports
import { useRouter } from 'next/router'
import Checkout from 'src/components/payment'
import { useAuth } from 'src/hooks/useAuth'

const StudentPreview = () => {
  const router: any = useRouter()
  const { applicationCode } = router.query as any
  const studentData = useAuth()?.user
  if (studentData?.studentCode && applicationCode) {
    return <Checkout appCode={applicationCode} studentCode={studentData?.studentCode} />
  }

  return <></>
}

export default StudentPreview
