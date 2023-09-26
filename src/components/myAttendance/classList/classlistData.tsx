import * as React from 'react'
import { Box, Typography, TableCell, TableRow } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import { AttendanceStatusObj } from 'src/context/common'

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
            <Typography>{`${index + 1}`}</Typography>
          </Box>
        </TableCell>

        <TableCell sx={{ minWidth: 150, flex: 0.17 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              noWrap
              variant='body2'
              sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
            >
              {row.Date}
            </Typography>
          </Box>
        </TableCell>

        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.Day}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row.from}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.to}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.totalClass}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.totalAttend}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.percent}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.Facilitator}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 150 }}>
          <Typography variant='body2'>{row?.Venue}</Typography>
        </TableCell>
        <TableCell sx={{ flex: 0.17, minWidth: 50 }}>
          <CustomChip
            skin='light'
            size='small'
            label={row.Status}
            color={AttendanceStatusObj[row.Status]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default ClassList
