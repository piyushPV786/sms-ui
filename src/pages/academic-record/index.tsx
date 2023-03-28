import { Box, Button, Grid, TextField, Theme, Typography } from '@mui/material'
import * as React from 'react'
import Card from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import Pdf from 'react-to-pdf'
import { useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'
import { AcademicTypography, TableCard } from 'src/styles/styled'
import { successToast } from 'src/components/common'
import { Download } from 'mdi-material-ui'
import { AcademicService } from 'src/service'

const ref: any = React.createRef()
const options = {
  orientation: 'landscape',
  unit: 'in',
  format: [13, 20]
}

const StudentDashboard = () => {
  const [data, setData] = useState([])

  const handleOnDownloadClick = (toPdf: () => void) => {
    //Call API
    toPdf()
    successToast('Academic Records downloaded successfully.')
  }
  const getStudentList = async () => {
    const response = await AcademicService?.getStudentAcademicDetails()
    setData(response?.data?.data)
  }
  React.useEffect(() => {
    getStudentList()
  }, [])

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

  return (
    <Grid container spacing={6} ref={ref}>
      <Grid item xs={12}>
        <Typography variant='h5' gutterBottom>
          Academic Records
          <Typography variant='h6'>Dashboard/Academic Records</Typography>
        </Typography>
        <Card>
          <MuiCardContent sx={{ backgroundColor: 'rgb(80,149,142)' }}>
            <Grid container>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Student Number</AcademicTypography>
                <AcademicTypography sx={{ mt: 2 }} variant='body2'>
                  REG12536253
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Full Name</AcademicTypography>
                <AcademicTypography sx={{ mt: 2 }} variant='body2'>
                  Student Number
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>ID Number</AcademicTypography>
                <AcademicTypography sx={{ mt: 2 }} variant='body2'>
                  128918291829812
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Date Of Birth</AcademicTypography>
                <AcademicTypography sx={{ mt: 2 }} variant='body2'>
                  25-08-1986
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Qualification</AcademicTypography>
                <AcademicTypography sx={{ mt: 2 }} variant='body2'>
                  Master of Business Administration
                </AcademicTypography>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>NQF Level</AcademicTypography>
                <AcademicTypography sx={{ mt: 2 }} variant='body2'>
                  5
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Date of Registration</AcademicTypography>
                <AcademicTypography sx={{ mt: 2 }} variant='body2'>
                  09 February 2022
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.4}>
                <AcademicTypography variant='body2'>Status</AcademicTypography>
                <AcademicTypography sx={{ mt: 2 }} variant='body2'>
                  Qualification in Progress
                </AcademicTypography>
              </Grid>
              <Grid item xs={2.5}>
                <AcademicTypography variant='body2'>
                  Graduation Date
                  <AcademicTypography sx={{ mt: 2 }} variant='body2'>
                    -
                  </AcademicTypography>
                </AcademicTypography>
              </Grid>
            </Grid>
          </MuiCardContent>
        </Card>
        <Grid item xs={12} mt={12}>
          <TableCard>
            <Box
              sx={{
                p: 5,
                pb: 3,
                display: 'flex'
              }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex' }}>
                <TextField size='small' placeholder='Search...' sx={{ mr: 4, mb: 2, maxWidth: '280px' }} />
              </Box>

              <Box>
                <Pdf targetRef={ref} filename='code-example.pdf' options={options}>
                  {({ toPdf }: any) => (
                    <Button
                      size='medium'
                      startIcon={<Download />}
                      variant='outlined'
                      sx={{
                        backgroundColor: (theme: Theme) => theme.palette.common.white,
                        color: (theme: Theme) => theme.palette.primary.light,
                        borderColor: (theme: Theme) => theme.palette.primary.light
                      }}
                      onClick={() => handleOnDownloadClick(toPdf)}
                    >
                      DOWNLOAD
                    </Button>
                  )}
                </Pdf>
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
