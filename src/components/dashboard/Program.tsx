import { Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import { Box } from '@mui/system'
import { ISchedule, IScheduleData } from 'src/context/common'
import ElectiveModule from '../dialog/ElectiveModule'
import ApplyNewProgram from 'src/components/dialog/ApplyNewProgram'
import { useQueryClient } from '@tanstack/react-query'
import { applicationStatus } from '../common/Constants'
import { useEffect, useState } from 'react'

const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(3)} !important`,
  borderTop: '8px solid #6151FB',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '0 !important'
  }
}))

const Program = ({ scheduler }: any) => {
  const [progDetail, setProgDetail] = useState<any>({ completed: [], current: [] })
  const programData =
    scheduler &&
    scheduler?.map((data: IScheduleData) => data?.courseSchedule?.find((i: ISchedule) => i)?.programSchedule?.program)

  const queryClient = useQueryClient()
  const leadId = window.sessionStorage.getItem('leadId')

  const applicationDetails: any[] | undefined = queryClient.getQueryData(['applicationData', leadId])
  const application = applicationDetails?.find((item: any) => item?.status === applicationStatus.graduated)

  const isGraduate =
    applicationDetails?.length && applicationDetails?.every(i => i.status === applicationStatus.graduated)

  useEffect(() => {
    setProgDetail((prev: any) => ({
      ...prev,
      ['completed']: applicationDetails?.filter(app => app.status === applicationStatus?.graduated),
      ['current']: applicationDetails?.filter(app => app.status !== applicationStatus?.graduated)
    }))
  }, [applicationDetails, applicationStatus])

  return (
    <Card sx={{ position: 'relative', borderRadius: '0px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' mb={5} color={'primary'}>
            My Qualification
          </Typography>

          {progDetail?.completed?.length > 0 && (
            <Box>
              <Typography variant='body2'>Completed Qualification</Typography>
              {progDetail?.completed?.map((program: any) => (
                <Box key={program?.id} sx={{ display: 'block !important' }}>
                  <Typography
                    variant='caption'
                    sx={{ mb: 5, fontWeight: 600, color: 'text.primary' }}
                  >{`${program?.education?.programName}(${program?.education?.programCode})`}</Typography>
                </Box>
              ))}
            </Box>
          )}
          {progDetail?.current?.length > 0 && (
            <Box>
              <Typography variant='body2'>Current Qualification</Typography>
              {progDetail?.current?.map((program: any) => (
                <Box key={program?.id} sx={{ display: 'block !important' }}>
                  <Typography
                    variant='caption'
                    sx={{ mb: 5, fontWeight: 600, color: 'text.primary' }}
                  >{`${program?.education?.programName}(${program?.education?.programCode})`}</Typography>
                </Box>
              ))}
            </Box>
          )}
          <Box>
            <ElectiveModule />

            {isGraduate ? <ApplyNewProgram programData={programData} application={application} /> : null}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Program
