import { Box, Button, Grid, Theme, Typography } from '@mui/material'
import * as React from 'react'
import Card from '@mui/material/Card'
import { useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'
import { AcademicTypography, CardContent, TableCard } from 'src/styles/styled'
import { successToastBottomRight, errorToast } from 'src/components/common'
import { Download } from 'mdi-material-ui'
import { AcademicService, StudentService } from 'src/service'
import { downloadSuccess, info, status } from 'src/context/common'
import SearchBox from 'src/@core/components/searchinput'
import { useAuth } from 'src/hooks/useAuth'

const StudentDashboard = () => {
  const [data, setData] = useState([])
  const [value, setValue] = useState<string>('')

  const auth: any = useAuth()

  const handleOnDownloadClick = async () => {
    const downloadedTranscript = await StudentService?.downloadTranscript(auth.user?.studentCode)
    if (downloadedTranscript?.status == status.successCode) {
      downloadTranscripts(downloadedTranscript?.data, downloadSuccess.academicDownload)
    } else {
      errorToast(downloadSuccess.studentCodeError)
    }
  }

  const downloadTranscripts = async (fileName: Blob, msg: string) => {
    const url = URL.createObjectURL(fileName)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Academic Transcript'
    a.click()
    successToastBottomRight(msg)
  }

  const getStudentList = async () => {
    const response = await AcademicService?.getStudentAcademicDetails()
    setData(response?.data?.data?.total)
  }
  React.useEffect(() => {
    getStudentList()
  }, [value])

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
      headerName: 'Course Code'
    },
    {
      minWidth: 240,
      flex: 0.25,
      field: 'courseName',
      headerName: 'Course Name'
    },
    {
      minWidth: 240,
      flex: 0.1,
      field: 'assessment',
      headerClassName: 'digital-assessment',
      cellClassName: 'digital-assessment',
      renderHeader: () => <AcademicTypography>Digital Assessment</AcademicTypography>
    },
    {
      minWidth: 150,
      flex: 0.1,
      field: 'assignments',
      headerClassName: 'assignments',
      cellClassName: 'assignments',
      renderHeader: () => <AcademicTypography>Assignments</AcademicTypography>
    },
    {
      minWidth: 160,
      flex: 0.1,
      field: 'examination',
      headerClassName: 'examination',
      cellClassName: 'examination',
      renderHeader: () => <AcademicTypography>Examination</AcademicTypography>
    },
    {
      minWidth: 160,
      flex: 0.1,
      field: 'total',
      headerClassName: 'total',
      cellClassName: 'total',
      renderHeader: () => <AcademicTypography>Total(100%)</AcademicTypography>
    },
    {
      minWidth: 160,
      flex: 0.1,
      field: 'symbol',
      headerName: 'Symbol'
    },
    {
      minWidth: 160,
      flex: 0.1,
      field: 'status',
      headerName: 'Status'
    }
  ]

  const handleFilter = (val: string) => {
    setValue(val)
  }

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
              {info.map((item: any) => (
                <Grid item xs={2.4} key={item.title}>
                  <AcademicTypography variant='body2'>{item.title}</AcademicTypography>
                  <AcademicTypography sx={{ mt: 0.5, mb: 2 }} variant='body2'>
                    {item.description}
                  </AcademicTypography>
                </Grid>
              ))}
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
              <Box sx={{ mr: 5 }}>
                <SearchBox handleFilter={handleFilter} />
              </Box>

              <Box>
                <Button
                  size='medium'
                  startIcon={<Download />}
                  variant='outlined'
                  sx={{
                    backgroundColor: (theme: Theme) => theme.palette.common.white,
                    color: (theme: Theme) => theme.palette.primary.light,
                    borderColor: (theme: Theme) => theme.palette.primary.light
                  }}
                  onClick={() => handleOnDownloadClick()}
                >
                  DOWNLOAD
                </Button>
              </Box>
            </Box>
            <DataGrid
              autoHeight
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              rows={data}
              columns={columns}
              disableSelectionOnClick
            />
          </TableCard>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StudentDashboard
