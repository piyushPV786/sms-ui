import { Box, Button, Grid, TextField, Theme, Typography } from '@mui/material'
import * as React from 'react'
import Card from '@mui/material/Card'
import Pdf from 'react-to-pdf'
import { useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'
import { AcademicTypography, CardContent, TableCard } from 'src/styles/styled'
import { successToast } from 'src/components/common'
import { Download } from 'mdi-material-ui'
import { AcademicService } from 'src/service'
import { info } from 'src/context/common'

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
                display: 'flex'
              }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex' }}>
                <TextField variant="standard" size='small' placeholder='Search...' sx={{ mr: 4, mb: 2, maxWidth: '280px' }} />
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
