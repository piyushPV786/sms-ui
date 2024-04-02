import React from 'react'
import { useRouter } from 'next/router'
import DocumentUploadPage from 'src/components/DocumentUploadPage'
import { useQuery } from '@tanstack/react-query'
import { ApplyService } from 'src/service'
import { useAuth } from 'src/hooks/useAuth'

const UploadDocuments = () => {
  const router: any = useRouter()
  const { applicationCode } = router.query as any
  const { studentCode }: any = useAuth()?.user

  const { data: studentDetail } = useQuery({
    queryKey: ['studentData', studentCode],
    queryFn: () => ApplyService?.getStudentDetail(studentCode),
    refetchOnWindowFocus: false,
    enabled: !!studentCode && !!applicationCode
  })
  if (studentDetail?.lead?.leadCode) {
    return (
      <DocumentUploadPage
        applicationCode={applicationCode}
        studentCode={studentCode}
        leadCode={studentDetail?.lead?.leadCode}
      />
    )

    return <></>
  }

  return <></>
}

export default UploadDocuments
