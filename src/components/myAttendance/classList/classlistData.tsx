import * as React from 'react'
import { Box, Typography, TableCell, TableRow } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import { AttendanceStatusObj } from 'src/context/common'
import { DDMMYYDateFormate, serialNumber } from 'src/utils'

interface IClassListProps {
  row: any
  index: number
}

const ClassList = ({ row, index }: IClassListProps) => {
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ minWidth: 30, flex: 0.15, borderLeft: '4px solid green' }}>
          <Box>
            <Typography>{serialNumber(index, 1, 10)}</Typography>
          </Box>
        </TableCell>

        <TableCell sx={{ minWidth: 150, flex: 0.17 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              noWrap
              variant='body2'
              sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
            >
              {row?.attendanceData && DDMMYYDateFormate(row?.attendanceData?.classDate)?.date}
            </Typography>
          </Box>
        </TableCell>

        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.attendanceData?.day}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.attendanceData?.from}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.attendanceData?.to}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.attendanceData?.totalClass}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.attendanceData?.totalAttend}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.attendanceData?.percentage}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.classManagementdata[0]?.facilitator}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.classManagementdata[0]?.venue}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 50 }}>
          <CustomChip
            skin='light'
            size='small'
            label={row?.attendanceData?.status}
            color={AttendanceStatusObj[row?.attendanceData?.status]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default ClassList
