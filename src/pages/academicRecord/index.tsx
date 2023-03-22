import { Alert, Grid, Snackbar, Typography } from '@mui/material'
import * as React from 'react'
import Card from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'

import TableHeader from 'src/components/apps/academicRecords/tableHeader'
import { useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'
import { AcademicTypography, TableCard } from 'src/styles/styled'
import { successToast } from 'src/components/common'

const StudentDashboard = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [response, setResponse] = useState([])

  const handleOnDownloadClick = () => {
    //Call API
    setOpen(true)
    setResponse([])
    successToast('Academic Records downloaded successfully.')
  }

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
      field: 'digitalAssessment',
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
    <Grid container spacing={6}>
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
            <TableHeader handleOnDownloadClick={handleOnDownloadClick} />
            <DataGrid
              autoHeight
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              rows={response}
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
