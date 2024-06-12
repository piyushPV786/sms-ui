// ** MUI Imports
import { Backdrop, CircularProgress, Divider, Grid, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useQuery } from '@tanstack/react-query'
import { ApplyService } from 'src/service'

import { StudentIdCard, StyledStatusBedge } from 'src/styles/styled'
import { applicationStatus, studentApplicationAllStatus } from '../common/Constants'
import { YYYYMMDDDateFormat, getName } from 'src/utils'
import { ActionButtons } from './common'
import { ICommonData } from 'src/context/common'

interface IMyDays {
  studentCode: string
  programList: ICommonData[]
}
const MyDays = ({ studentCode, programList }: IMyDays) => {
  const { data: studentDetail } = useQuery({
    queryKey: ['studentData', studentCode],
    queryFn: () => ApplyService?.getStudentDetail(studentCode),
    refetchOnWindowFocus: false
  })
  window.sessionStorage.setItem('leadId', studentDetail?.lead?.id)
  const { data: applicationDetails, isLoading } = useQuery({
    queryKey: ['applicationData'],
    queryFn: () => ApplyService?.GetApplicationDetails(studentDetail?.lead?.id),
    refetchOnWindowFocus: false,
    enabled: !!studentDetail?.lead?.id
  })

  return (
    <Card sx={{ position: 'relative' }}>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='primary' />
      </Backdrop>
      <CardContent sx={{ backgroundColor: '#4f958e' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6' color='white'>
              MY APPLICATIONS
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {!!applicationDetails && (
              <ApplicationCard applicationDetails={applicationDetails} programList={programList} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MyDays

const ApplicationCard = (props: any) => {
  const { applicationDetails, programList } = props
  const application = applicationDetails?.find((item: any) => item?.status !== applicationStatus.graduated)

  if (!application) {
    return (
      <>
        <Grid xs={12} display='flex' justifyContent='center'>
          <Typography> No Applications</Typography>
        </Grid>
      </>
    )
  }

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} display='flex' justifyContent='flex-end'>
          <Grid item xs={12}>
            <StyledStatusBedge status={application?.status}>
              {studentApplicationAllStatus[application?.status] ?? application?.status}
            </StyledStatusBedge>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container sx={{ p: 3 }}>
            <Grid item xs={12}>
              <Typography variant='caption'>Interested Qualification</Typography>
              <Typography variant='body2'>
                <strong>{getName(programList, application?.education?.programCode)}</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='caption'>Last Updated</Typography>
              <Typography variant='body2'>
                <strong>{YYYYMMDDDateFormat(application?.updatedAt)}</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='caption'>Study Mode</Typography>
              <Typography variant='body2'>
                <strong>{application?.education?.studyModeCode}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <StudentIdCard bgColor='#4f958e'>Student ID: {application?.lead?.studentCode}</StudentIdCard>
            </Grid>
            <Grid item xs={12}>
              <StudentIdCard bgColor='#235290'>Application ID: {application?.applicationCode}</StudentIdCard>
            </Grid>
          </Grid>
        </Grid>
        <Divider color='#4f958e' sx={{ height: 2, width: '100%' }} />
        <Grid item xs={12}>
          <Grid item xs={12} sx={{ p: 2 }}>
            <ActionButtons applicationDetail={application} />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}
