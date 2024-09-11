import { Backdrop, CircularProgress, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { applicationStatus } from 'src/components/common/Constants'
import Assignments from 'src/components/dashboard/Assignments'
import Classes from 'src/components/dashboard/Classes'
import DashboardCustomHooks from 'src/components/dashboard/CustomHooks'
import MyApplication from 'src/components/dashboard/MyApplication'
import Program from 'src/components/dashboard/Program'
import StudentDetails from 'src/components/dashboard/StudentDetails'
import { ISchedule, IScheduleData } from 'src/context/common'
import { useAuth } from 'src/hooks/useAuth'

// eslint-disable-next-line no-empty-pattern
const StudentDashboard = ({}) => {
  const {
    scheduler,
    profileImage,
    classes,
    invigilator,
    programList,
    isLoading,
    rollover,
    studentDetails,
    electiveModule,
    getElectiveModuleList,
    module,
    paymentStatus
  } = DashboardCustomHooks()

  const courses = scheduler && scheduler?.map((data: IScheduleData) => data?.courseSchedule?.find((i: ISchedule) => i))
  const courseSchedule =
    scheduler &&
    scheduler?.map((data: IScheduleData) => data?.courseSchedule?.find((i: ISchedule) => i.scheduleDuration))
  const application: any = studentDetails?.application?.find(
    (item: any) => item?.status !== applicationStatus.graduated
  )

  // const dayData = myDayData && myDayData?.map((data: IScheduleData) => data?.courseSchedule?.find((i: ISchedule) => i))
  const studentData = useAuth()?.user

  return (
    <Box>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='primary' />
      </Backdrop>
      <Typography mt={5} mb={5} sx={{ fontWeight: 'bold' }}>
        Welcome to SMS Dashboard
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={9}>
          <StudentDetails
            profileImage={profileImage}
            rollover={rollover}
            studentDetails={studentDetails}
            module={module}
            electiveModule={electiveModule}
            getElectiveModuleList={getElectiveModuleList}
            applicationCode={application?.applicationCode}
            paymentStatus={paymentStatus}
          />
          <Grid container spacing={4} mt={5}>
            <Grid item xs={4} md={4}>
              <Program
                scheduler={scheduler}
                electiveModule={electiveModule}
                getElectiveModuleList={getElectiveModuleList}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <Classes
                classes={classes}
                invigilator={invigilator}
                courseSchedule={courseSchedule}
                programList={programList}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <Assignments courseData={courses} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          {studentData?.studentCode && (
            <MyApplication studentCode={studentData?.studentCode} programList={programList} />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default StudentDashboard
