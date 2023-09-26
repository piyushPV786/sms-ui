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
import { AttendanceStatusObj, ClassResponse } from 'src/context/common'

const TableHeaderTypography = styled(Typography)<any>(() => ({
  fontWeight: 'bold',
  fontSize: '0.75rem',
  letterSpacing: '0.17px'
}))

function AttendanceListRow({ row }: any) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleManageCourse = () => {
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ minWidth: 60, flex: 0.15 }}>
          <Box>
            <Typography>{row.id}</Typography>
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
                {row.code}
              </Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell sx={{ flex: 0.17, minWidth: 140 }}>
          <Typography variant='caption'>{row.name}</Typography>
        </TableCell>

        <TableCell sx={{ flex: 0.18, minWidth: 120 }}>{row.class}</TableCell>

        <TableCell sx={{ flex: 0.25, minWidth: 150 }}>{row.attendance}</TableCell>
        <TableCell sx={{ flex: 0.18, minWidth: 180 }}>
          <Typography
            variant='body2'
            sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
          >
            {row.percent}
          </Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <CustomChip
            skin='light'
            size='small'
            label={row.Status}
            color={AttendanceStatusObj[row.Status]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        </TableCell>
        <TableCell sx={{ flex: 0.2, minWidth: 100 }}>
          <Button size='small' variant='outlined' onClick={() => handleManageCourse()}>
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
                      {ClassResponse.data.map((row, i) => (
                        <ClassList row={row} key={i} index={i} />
                      ))}
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
