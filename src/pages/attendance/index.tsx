/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Link } from '@mui/material'

// ** Custom Components Imports
import TableHeader from 'src/components/myAttendance/tableHeader'

import {
  Grid,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  styled
} from '@mui/material'
import AttendanceListRow from 'src/components/myAttendance/attendanceList'
import OverAllCard from 'src/components/myAttendance/overAllAttendance/overAll'
import { AcademicService, UserManagementService } from 'src/service'
import DashboardCustomHooks from 'src/components/dashboard/CustomHooks'
import { IRow } from 'src/context/common'
import { commonListTypes } from 'src/types/dataTypes'

interface ITabelData {
  map(arg0: (row: IRow, index: number) => JSX.Element): import('react').ReactNode
  tableData: IRow
}

const TableHeaderTypography = styled(Typography)<any>(() => ({
  fontWeight: 'bold',
  fontSize: '0.75rem',
  letterSpacing: '0.17px'
}))

const AttendanceList = () => {
  const { studentDetails } = DashboardCustomHooks()
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [count, setCount] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [tableData, setTableData] = useState<ITabelData>()
  const [courses, setCourses] = useState<Array<commonListTypes>>([])
  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10))
    setPageNumber(0)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNumber(newPage)
  }
  const getDetails = async () => {
    const response = await UserManagementService?.getAttendanceDetails(
      studentDetails?.studentCode ?? studentDetails?.studentCode
    )
    if (response?.data?.length > 0) {
      setTableData(response?.data)
      setCount(response?.count)
    }
  }

  const getCourses = async () => {
    const response = await AcademicService.getAllCourses()
    if (response?.data?.length > 0) {
      setCourses(response?.data)
    }
  }
  useEffect(() => {
    getDetails()
    getCourses()
  }, [studentDetails])

  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={12}>
              <Typography sx={{ lineHeight: '2rem', fontWeight: 'bold', fontSize: 18 }}>My Attendance</Typography>
              <Grid item xs={12}>
                <Box display={'flex'}>
                  <Link href='/student/dashboard/'>Dashboard</Link> / My Attendance
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={8} xs={12}>
          <Card>
            <Box sx={{ display: 'flex' }}>
              <TableHeader value={value} handleFilter={handleFilter} />
            </Box>
            <TableContainer id='#my-table'>
              <Table aria-label='collapsible table'>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme => theme.palette.customColors.light }}>
                    <TableCell sx={{ minWidth: 60, flex: 0.15 }}>
                      <TableHeaderTypography>#</TableHeaderTypography>
                    </TableCell>
                    <TableCell sx={{ minWidth: 150, flex: 0.25 }}>
                      <TableHeaderTypography>Course Code</TableHeaderTypography>
                    </TableCell>
                    <TableCell sx={{ flex: 0.17, minWidth: 140 }}>
                      <TableHeaderTypography>Course Name</TableHeaderTypography>
                    </TableCell>
                    <TableCell sx={{ flex: 0.25, minWidth: 200 }}>
                      <TableHeaderTypography>Toatal Class (In MIns)</TableHeaderTypography>
                    </TableCell>
                    <TableCell sx={{ flex: 0.18, minWidth: 220 }}>
                      <TableHeaderTypography>Toatal Attended (In MIns)</TableHeaderTypography>
                    </TableCell>
                    <TableCell sx={{ flex: 0.25, minWidth: 50 }}>
                      <TableHeaderTypography>%</TableHeaderTypography>
                    </TableCell>
                    <TableCell sx={{ flex: 0.25, minWidth: 120 }}>
                      <TableHeaderTypography>status</TableHeaderTypography>
                    </TableCell>
                    <TableCell sx={{ flex: 0.17, minWidth: 140 }}>
                      <TableHeaderTypography>Actions</TableHeaderTypography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData?.map((row: IRow, index: number) => (
                    <AttendanceListRow
                      key={row?.id}
                      row={row}
                      index={index}
                      pageNumber={pageNumber}
                      pageSize={pageSize}
                      courses={courses}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25]}
              component='div'
              count={count}
              rowsPerPage={pageSize}
              page={pageNumber}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <OverAllCard tableData={tableData} />
        </Grid>
      </Grid>
    </>
  )
}

export default AttendanceList
