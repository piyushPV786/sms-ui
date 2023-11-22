import * as React from 'react'
import { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  styled,
  Button
} from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import ClassList from './classList/classlistData'
import ClassTableHeader from './classList/classTableHeader'
import { AttendanceStatusObj, IRow } from 'src/context/common'
import { OperationService } from 'src/service'
import { getCourseName, minTwoDigits, serialNumber } from 'src/utils'
import { commonListTypes } from 'src/types/dataTypes'

interface IAttendanceProps {
  row: IRow
  index: number
  pageNumber: number
  pageSize: number
  courses: Array<commonListTypes>
}
interface IClassList {
  classList: IRow
}
const TableHeaderTypography = styled(Typography)<any>(() => ({
  fontWeight: 'bold',
  fontSize: '0.75rem',
  letterSpacing: '0.17px'
}))

function AttendanceListRow({ row, index, pageNumber, pageSize, courses }: IAttendanceProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const [classList, setClassList] = useState<IClassList[]>([])
  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleManageCourse = async (scheduleCode: number | string) => {
    setOpen(!open)
    const response = await OperationService?.getClassList(scheduleCode)
    setClassList([response])
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ minWidth: 60, flex: 0.15 }}>
          <Box>
            <Typography>{minTwoDigits(serialNumber(index, pageNumber + 1, pageSize))}</Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ minWidth: 150, flex: 0.25 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='body2'
                sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
              >
                {row?.courseCode}
              </Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell sx={{ flex: 0.17, minWidth: 140 }}>
          <Typography
            sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
            variant='body2'
          >
            {getCourseName(courses, row?.courseCode)}
          </Typography>
        </TableCell>

        <TableCell sx={{ flex: 0.18, minWidth: 120 }}>{row?.totalClass}</TableCell>

        <TableCell sx={{ flex: 0.25, minWidth: 150 }}>{row?.totalAttend}</TableCell>
        <TableCell sx={{ flex: 0.18, minWidth: 50 }}>
          <Typography
            variant='body2'
            sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
          >
            {row?.percentage}
          </Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <CustomChip
            skin='light'
            size='small'
            label={row?.status}
            color={AttendanceStatusObj[row?.status]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        </TableCell>
        <TableCell sx={{ flex: 0.2, minWidth: 100 }}>
          <Button size='small' variant='outlined' onClick={() => handleManageCourse(row?.scheduleCode)}>
            View Details
          </Button>
        </TableCell>
      </TableRow>

      <TableRow sx={{ bgcolor: '#f5f5f7' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={100}>
          <Collapse in={open} timeout='auto' unmountOnExit sx={{ paddingBottom: 10, paddingTop: 4 }}>
            <Grid item>
              <Box sx={{ display: 'flex' }}>
                <ClassTableHeader value={value} handleFilter={handleFilter} />
              </Box>
              <Card sx={{ borderRadius: '0' }}>
                <TableContainer>
                  <Table
                    aria-label='collapsible table'
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: 'none'
                      }
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ minWidth: 60, flex: 0.15, borderLeft: '4px solid green', fontWeight: 'bold' }}>
                          <TableHeaderTypography>#</TableHeaderTypography>
                        </TableCell>
                        <TableCell sx={{ minWidth: 150, flex: 0.25 }}>
                          <TableHeaderTypography>Date</TableHeaderTypography>
                        </TableCell>
                        <TableCell sx={{ flex: 0.17, minWidth: 200 }}>
                          <TableHeaderTypography>Day</TableHeaderTypography>
                        </TableCell>
                        <TableCell sx={{ flex: 0.1, minWidth: 100 }}>
                          <TableHeaderTypography>From</TableHeaderTypography>
                        </TableCell>
                        <TableCell sx={{ flex: 0.1, minWidth: 100 }}>
                          <TableHeaderTypography>To</TableHeaderTypography>
                        </TableCell>
                        <TableCell sx={{ flex: 0.2, minWidth: 120 }}>
                          <TableHeaderTypography>Toatal Class</TableHeaderTypography>
                        </TableCell>
                        <TableCell sx={{ flex: 0.2, minWidth: 120 }}>
                          <TableHeaderTypography>Total Attended</TableHeaderTypography>
                        </TableCell>
                        <TableCell sx={{ flex: 0.2, minWidth: 190 }}>
                          <TableHeaderTypography>%</TableHeaderTypography>
                        </TableCell>
                        <TableCell sx={{ flex: 0.2, minWidth: 200 }}>
                          <TableHeaderTypography>Facilitator</TableHeaderTypography>
                        </TableCell>
                        <TableCell sx={{ flex: 0.2, minWidth: 200 }}>
                          <TableHeaderTypography>Venue</TableHeaderTypography>
                        </TableCell>
                        <TableCell sx={{ flex: 0.2, minWidth: 150 }}>
                          <TableHeaderTypography>Status</TableHeaderTypography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classList &&
                        classList?.map((row: IClassList, i: number) => <ClassList row={row} key={i} index={i} />)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default AttendanceListRow
