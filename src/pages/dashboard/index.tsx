import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Assignments from 'src/components/dashboard/Assignments'
import Classes from 'src/components/dashboard/Classes'
import DashboardCustomHooks from 'src/components/dashboard/CustomHooks'
import MyDays from 'src/components/dashboard/MyDays'
import Program from 'src/components/dashboard/Program'
import StudentDetails from 'src/components/dashboard/StudentDetails'
import { ISchedule, IScheduleData } from 'src/context/common'

const StudentDashboard = ({}) => {
  const { scheduler, myDayData, profileImage, classes, invigilator, programList } = DashboardCustomHooks()

  const courses = scheduler && scheduler?.map((data: IScheduleData) => data?.courseSchedule?.find((i: ISchedule) => i))
  const courseSchedule =
    scheduler &&
    scheduler?.map((data: IScheduleData) => data?.courseSchedule?.find((i: ISchedule) => i.scheduleDuration))
  const dayData = myDayData && myDayData?.map((data: IScheduleData) => data?.courseSchedule?.find((i: ISchedule) => i))

  return (
    <Box>
      <Typography mt={5} mb={5} sx={{ fontWeight: 'bold' }}>
        Welcome to SM Dashboard
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={9}>
          <StudentDetails profileImage={profileImage} />
          <Grid container spacing={4} mt={5}>
            <Grid item xs={4} md={4}>
              <Program scheduler={scheduler} />
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
          <MyDays dayData={dayData} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default StudentDashboard
