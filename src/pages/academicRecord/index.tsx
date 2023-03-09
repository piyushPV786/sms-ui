import { Alert, Grid, Snackbar, Typography } from '@mui/material'
import * as React from 'react'
import Card from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import { styled } from '@mui/material'
import { AcademicService } from 'src/service'
import TableHeader from 'src/components/apps/academicRecords/tableHeader'
import { useState, useEffect, useRef } from 'react'
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import {



  Table,
  TableBody,
  TableCell,
  TableContainer,

  TableRow,

} from '@mui/material'



const StudentDashboard = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<any>()
  const getStudentList = async () => {

    const response = await AcademicService?.getStudentAcademicDetails()
    setData(response?.data.data)


  }

  useEffect(() => {
    getStudentList()
  }, [])



  const inputRef = useRef<any>();
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0, 0, 0);
      pdf.save("download.pdf");
    });
  };


  const handleOnDownloadClick = () => {
    //Call API
    setOpen(true)
    printDocument()
  }


  function Row(props: any) {
    const { row } = props


    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell sx={{ minWidth: 76, flex: 0.1, }}><Typography variant='body2'>{row.year}</Typography></TableCell>
          <TableCell sx={{ minWidth: 240, flex: 0.25 }}><Typography variant='body2'>{row.courseCode}</Typography></TableCell>
          <TableCell sx={{ minWidth: 240, flex: 0.25 }}><Typography variant='body2'>{row.courseName}</Typography></TableCell>
          <TableCell sx={{ minWidth: 240, flex: 0.1, bgcolor: "#58555e" }}><AcademicTypography variant='body2'>{row.assessment}</AcademicTypography></TableCell>
          <TableCell sx={{ minWidth: 150, flex: 0.1, bgcolor: "#726262" }}><AcademicTypography variant='body2'>{row.assignments}</AcademicTypography></TableCell>
          <TableCell sx={{ minWidth: 160, flex: 0.1, bgcolor: "#5f5870" }}><AcademicTypography variant='body2'>{row.examination}</AcademicTypography></TableCell>
          <TableCell sx={{ minWidth: 160, flex: 0.1, bgcolor: "#3c7360" }}><AcademicTypography variant='body2'>{row.total}</AcademicTypography></TableCell>
          <TableCell sx={{ minWidth: 160, flex: 0.1 }}><Typography variant='body2'>{row.symbol}</Typography></TableCell>
          <TableCell sx={{ minWidth: 160, flex: 0.1 }}><Typography variant='body2'>{row.status}</Typography></TableCell>
        </TableRow>


      </React.Fragment>
    )
  }


  return (
    <Grid container spacing={6} ref={inputRef}>
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
          <Card>
            <TableHeader handleOnDownloadClick={handleOnDownloadClick} />




            <TableContainer>
              <Table aria-label='collapsible table'>

                <TableRow>
                  <TableCell sx={{ minWidth: 76, flex: 0.1, }}><Typography variant='h6'>Year</Typography></TableCell>
                  <TableCell sx={{ minWidth: 240, flex: 0.25 }}><Typography variant='h6'>Course Code</Typography></TableCell>
                  <TableCell sx={{ minWidth: 240, flex: 0.25 }}><Typography variant='h6'>Course Name</Typography></TableCell>
                  <TableCell sx={{ minWidth: 240, flex: 0.1, bgcolor: "#58555e", color: "white" }}><AcademicTypography variant='h6'>Digital Assessment</AcademicTypography></TableCell>
                  <TableCell sx={{ minWidth: 150, flex: 0.1, bgcolor: "#726262" }}><AcademicTypography variant='h6'>Assignments</AcademicTypography></TableCell>
                  <TableCell sx={{ minWidth: 160, flex: 0.1, bgcolor: "#5f5870" }}><AcademicTypography variant='h6'>Examination</AcademicTypography></TableCell>
                  <TableCell sx={{ minWidth: 160, flex: 0.1, bgcolor: "#3c7360" }}><AcademicTypography variant='h6'>Total(100%)</AcademicTypography></TableCell>
                  <TableCell sx={{ minWidth: 160, flex: 0.1 }}><Typography variant='h6'>Symbol</Typography></TableCell>
                  <TableCell sx={{ minWidth: 160, flex: 0.1 }}><Typography variant='h6'>Status</Typography></TableCell>
                </TableRow>

                <TableBody>
                  {data?.map((row: any) => (
                    <Row key={row.id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity='success' sx={{ width: '100%' }}>
          Academic Records downloaded successfully.
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default StudentDashboard

const AcademicTypography = styled(Typography)(({ theme }: any) => ({
  color: theme.palette.common.white
}))
