import { Box, Grid, Typography } from '@mui/material'
import * as React from 'react'
import Card from '@mui/material/Card'

// import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { AcademicTypography, CardContent, TableCard } from 'src/styles/styled'
import { EnrolmentService, StudentService } from 'src/service'

//import SearchBox from 'src/@core/components/searchinput'
import { useAuth } from 'src/hooks/useAuth'
import DashboardCustomHooks from 'src/components/dashboard/CustomHooks'
import { DDMMYYYDateFormat } from 'src/utils'

const StudentDashboard = () => {
  const [graduatedDate, setDraduatedDate] = React.useState<string>('')
  const auth: any = useAuth()
  const { studentDetails } = DashboardCustomHooks()

  // const handleOnDownloadClick = async () => {
  //   const downloadedTranscript = await StudentService?.downloadTranscript(auth.user?.studentCode)
  //   if (downloadedTranscript?.status == status.successCode) {
  //     downloadTranscripts(downloadedTranscript?.data, downloadSuccess.academicDownload)
  //   } else {
  //     errorToast(downloadSuccess.studentCodeError)
  //   }
  // }
  // const downloadTranscripts = async (fileName: Blob, msg: string) => {
  //   const url = URL.createObjectURL(fileName)
  //   const a = document.createElement('a')
  //   a.href = url
  //   a.download = 'Academic Transcript'
  //   a.click()
  //   successToastBottomRight(msg)
  // }

  const getStudentList = async () => {
    await StudentService?.getStudentAcademicDetails(auth.user?.studentCode)
  }

  const { electiveModule, getElectiveModuleList } = DashboardCustomHooks()

  React.useEffect(() => {
    getStudentList()
    getElectiveModuleList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getStudentDetails = async () => {
    const progCode = studentDetails?.program?.code ? studentDetails?.program?.code : ''
    const studentCode = studentDetails?.studentCode ? studentDetails?.studentCode : ''
    const response = await EnrolmentService.GetStudentData(progCode, studentCode)
    setDraduatedDate(response?.graduatedDate)
  }
  React.useEffect(() => {
    studentDetails && getStudentDetails()
  }, [studentDetails])

  const columns = [
    {
      minWidth: 76,
      flex: 0.1,
      field: 'year',
      headerName: 'Year'
    },
    {
      minWidth: 240,
      flex: 0.25,
      field: 'courseCode',
      headerName: 'Module Code',
      renderCell: (row: any) => <Typography>{row.row.course.code}</Typography>
    },
    {
      minWidth: 260,
      flex: 0.25,
      field: 'courseName',
      headerName: 'Module Name',
      renderCell: (row: any) => <Typography>{row.row.course.name}</Typography>
    },
    {
      minWidth: 240,
      flex: 0.1,
      field: 'assessment',
      headerClassName: 'digital-assessment',
      cellClassName: 'digital-assessment',
      renderHeader: () => <AcademicTypography>Digital Assessment</AcademicTypography>,
      renderCell: (row: any) => (
        <Typography>
          {row?.row?.isAssessmentPublish
            ? row?.row?.assessment < row?.row?.moderateDigitalAssessment
              ? row?.row?.moderateDigitalAssessment
              : row?.row?.assessment
            : '-'}
        </Typography>
      )
    },
    {
      minWidth: 150,
      flex: 0.1,
      field: 'assignments',
      headerClassName: 'assignments',
      cellClassName: 'assignments',
      renderHeader: () => <AcademicTypography>Assignments</AcademicTypography>,
      renderCell: (row: any) => (
        <Typography>
          {row?.row?.isAssignmentPublish
            ? row?.row?.assignments < row?.row?.moderateAssignments
              ? row?.row?.moderateAssignments
              : row?.row?.assignments
            : '-'}
        </Typography>
      )
    },
    {
      minWidth: 160,
      flex: 0.1,
      field: 'examination',
      headerClassName: 'examination',
      cellClassName: 'examination',
      renderHeader: () => <AcademicTypography>Examination</AcademicTypography>,
      renderCell: (row: any) => (
        <Typography>
          {row?.row?.isExaminationPublish
            ? row?.row?.examination < row?.row?.moderateExamination
              ? row?.row?.moderateExamination
              : row?.row?.examination
            : '-'}
        </Typography>
      )
    },
    {
      minWidth: 160,
      flex: 0.1,
      field: 'total',
      headerClassName: 'total',
      cellClassName: 'total',
      renderHeader: () => <AcademicTypography>Total(100%)</AcademicTypography>,
      renderCell: (row: any) => (
        <Typography>
          {row?.row?.isAssignmentPublish && row?.row?.isAssessmentPublish && row?.row?.isExaminationPublish
            ? row?.row?.total
            : '-'}
        </Typography>
      )
    },
    {
      minWidth: 160,
      flex: 0.1,
      field: 'symbol',
      headerName: 'Symbol',
      renderCell: (row: any) => (
        <Typography>
          {row?.row?.isAssignmentPublish && row?.row?.isAssessmentPublish && row?.row?.isExaminationPublish
            ? row?.row?.symbol
            : '-'}
        </Typography>
      )
    },
    {
      minWidth: 160,
      flex: 0.1,
      field: 'status',
      headerName: 'Status',
      renderCell: (row: any) => (
        <Typography>
          {row?.row?.isAssignmentPublish && row?.row?.isAssessmentPublish && row?.row?.isExaminationPublish
            ? row?.row?.status
            : '-'}
        </Typography>
      )
    }
  ]

  // const handleFilter = (val: string) => {
  //   setValue(val)
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5' gutterBottom>
          Academic Transcript
          <Typography variant='h6'>Dashboard/Academic Transcript</Typography>
        </Typography>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Student Number</AcademicTypography>
                <AcademicTypography sx={{ mt: 0.5, mb: 2 }} variant='body2'>
                  {studentDetails?.studentCode ? studentDetails?.studentCode : '-'}
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Full Name</AcademicTypography>
                <AcademicTypography sx={{ mt: 0.5, mb: 2 }} variant='body2'>
                  {studentDetails?.firstName ? `${studentDetails?.firstName} ${studentDetails?.lastName}` : '-'}
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>ID Number</AcademicTypography>
                <AcademicTypography sx={{ mt: 0.5, mb: 2 }} variant='body2'>
                  {studentDetails?.identificationNumber ? studentDetails?.identificationNumber : '-'}
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Date Of Birth</AcademicTypography>
                <AcademicTypography sx={{ mt: 0.5, mb: 2 }} variant='body2'>
                  {studentDetails?.dateOfBirth ? DDMMYYYDateFormat(new Date(studentDetails?.dateOfBirth)) : '-'}
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Qualification</AcademicTypography>
                <AcademicTypography sx={{ mt: 0.5, mb: 2 }} variant='body2'>
                  {studentDetails?.program?.name ? studentDetails?.program?.name : '-'}
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>NQF Level</AcademicTypography>
                <AcademicTypography sx={{ mt: 0.5, mb: 2 }} variant='body2'>
                  {studentDetails?.program?.nqfLevel ? studentDetails?.program?.nqfLevel : '-'}
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Date of Registration</AcademicTypography>
                <AcademicTypography sx={{ mt: 0.5, mb: 2 }} variant='body2'>
                  {studentDetails?.createdAt ? DDMMYYYDateFormat(new Date(studentDetails?.createdAt)) : '-'}
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Status</AcademicTypography>
                <AcademicTypography sx={{ mt: 0.5, mb: 2 }} variant='body2'>
                  {studentDetails?.application[0]?.status ? studentDetails?.application[0]?.status : '-'}
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Graduation Date</AcademicTypography>
                <AcademicTypography sx={{ mt: 0.5, mb: 2 }} variant='body2'>
                  {graduatedDate ? DDMMYYYDateFormat(new Date(graduatedDate)) : '-'}
                </AcademicTypography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid item xs={12} mt={12}>
          <TableCard>
            <Box
              sx={{
                p: 5,
                pb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              {/* <Box sx={{ mr: 5 }}>
                <SearchBox handleFilter={handleFilter} />
              </Box> */}

              {/*           <Box>
                <Button
                  size='medium'
                  startIcon={<Download />}
                  variant='outlined'
                  disabled={!data?.length}
                  sx={{
                    backgroundColor: (theme: Theme) => theme.palette.common.white,
                    color: (theme: Theme) => theme.palette.primary.light,
                    borderColor: (theme: Theme) => theme.palette.primary.light
                  }}
                  onClick={() => handleOnDownloadClick()}
                >
                  DOWNLOAD
                </Button>
              </Box> */}
            </Box>
            <Box id='datagrid-container' sx={{ position: 'relative', minHeight: 300 }}>
              {/* Watermark */}
              <Typography
                variant='h1'
                sx={{
                  position: 'absolute',
                  zIndex: 'inherit',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-25deg)',
                  opacity: 0.2,
                  pointerEvents: 'none'
                }}
              >
                <div style={{ fontSize: electiveModule?.length === 0 ? '0' : '1em' }}>UNOFFICIAL</div>
              </Typography>
              <DataGrid
                autoHeight
                disableColumnMenu
                disableColumnFilter
                disableColumnSelector
                rows={electiveModule}
                columns={columns}
                disableSelectionOnClick
                sx={{
                  position: 'relative',
                  zIndex: 0,
                  '& .MuiTablePagination-root': { display: 'none' }
                }}
              />
            </Box>
          </TableCard>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default StudentDashboard
