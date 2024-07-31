import React from 'react'
import { useRouter } from 'next/router'
import DocumentUploadPage from 'src/components/DocumentUploadPage'
import { useQuery } from '@tanstack/react-query'
import { ApplyService } from 'src/service'
import { useAuth } from 'src/hooks/useAuth'
import { BackdropProvider } from 'src/components/DocumentUploadPage/context/BackdropContext'

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
  if (studentDetail?.lead?.id) {
    return (
      <BackdropProvider>
        <DocumentUploadPage
          applicationCode={applicationCode}
          studentCode={studentCode}
          leadId={studentDetail?.lead?.id}
        />
      </BackdropProvider>
    )

    return <></>
  }

  return <></>
}

export default UploadDocuments
