/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import { Theme } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'

import { StudentService } from 'src/service'
import { IIntakeStatusType, IntakeStatus, status } from 'src/context/common'

// ** Custom Components Imports
import TableHeader from 'src/components/feePayment/TableHeader'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { InlineTypography, StyledTypography } from 'src/styles/styled'
import { useAuth } from 'src/hooks/useAuth'
import RaiseQuery from 'src/components/dialog/RaiseQuery'
import { DDMMYYDateFormate, getName, minTwoDigits, serialNumber } from 'src/utils'
import { CellType, IDefaultValue, IIndex } from 'src/types/common'

const initialState = {
  message: '',
  data: [],
  statusCode: ''
}

const category = [
  { id: 1, name: 'Academic record/transcript', code: 'ACADEMIC_RECORD' },
  { id: 2, name: 'Facilitation query undergrade', code: 'FACILITATION_QUERY_UNDERGRADE' },
  { id: 3, name: 'Exam query', code: 'EXAM_QUERY' },
  { id: 4, name: 'Live stream', code: 'LIVE_STREAM' },
  { id: 5, name: 'Miscellaneous undergrade', code: 'MISCELLATEOUS_UNDERGRADE' },
  { id: 6, name: 'Assignment query', code: 'ASSIGNMENT_QUERY' },
  { id: 7, name: 'Venue query', code: 'VENUE_QUERY' }
]

const queryStatus = [
  { id: 1, name: 'Not started', code: 'NOT_STARTED' },
  { id: 2, name: 'Being actioned', code: 'BEING_ACTIONED' },
  { id: 3, name: 'Resolved', code: 'RESOLVED' },
  { id: 4, name: 'Escalated', code: 'ESCALATED' }
]

const getCourseStatus = (status: string) => {
  return status === 'NOT_STARTED'
    ? IntakeStatus.notStarted
    : status === 'BEING_ACTIONED'
    ? IntakeStatus.beingActioned
    : status === 'RESOLVED'
    ? IntakeStatus.resolved
    : IntakeStatus.escalated
}

const IntakeStatusObj: IIntakeStatusType = {
  [IntakeStatus.notStarted]: 'secondary',
  [IntakeStatus.beingActioned]: 'warning',
  [IntakeStatus.resolved]: 'success',
  [IntakeStatus.escalated]: 'error'
}

const QueryList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [response, setResponse] = useState<IDefaultValue>(initialState)
  const [loading, setLoading] = useState<boolean>(false)

  const auth = useAuth()

  const getQueriesList = async () => {
    const payload = {
      q: value,
      pageSize: pageSize,
      pageNumber: pageNumber
    }
    setLoading(true)
    if (auth?.user?.studentCode) {
      const response = await StudentService?.getQueryList(payload, auth?.user?.studentCode)
      if (response?.data?.statusCode === status.successCode && response?.data?.data) {
        setResponse(response?.data?.data)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    getQueriesList()
  }, [value, pageNumber, pageSize])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const columns = [
    {
      flex: 0.1,
      field: '#',
      minWidth: 30,
      headerName: '#',
      renderCell: (index: IIndex) => {
        return <Box>{`${minTwoDigits(serialNumber(index.api.getRowIndex(index.row.id), pageNumber, pageSize))}`}</Box>
      }
    },
    {
      flex: 0.1,
      field: 'subject',
      minWidth: 200,
      headerName: 'Subject'
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'queryType',
      headerName: 'Query Type',
      renderCell: (row: CellType) => {
        console.log('row', row)
        
return <Typography fontSize='small'>{getName(category, row.row.queryType)}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 300,
      field: 'description',
      headerName: 'Description'
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'createdAt',
      headerName: 'Created On',
      renderCell: (row: CellType) => {
        const date = new Date(row.row.createdAt)
        
return <Typography fontSize='small'>{DDMMYYDateFormate(date)?.date}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'status',
      headerName: 'Status',
      renderCell: (row: CellType) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={getName(queryStatus, row.row.status)}
            color={IntakeStatusObj[getCourseStatus(row.row.status)]}
            sx={{
              textTransform: 'capitalize',
              '& .MuiChip-label': { lineHeight: '18px' },
              borderRadius: '4px',
              boxShadow: '2px 4px 4px 0px #9f9f9f75'
            }}
          />
        )
      }
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={12}>
              <Typography sx={{ mb: 3, lineHeight: '2rem', fontWeight: 'bold', fontSize: 18 }}>My Queries</Typography>
              <Grid item xs={12}>
                <Box display={'flex'}>
                  <StyledTypography>Dashboard </StyledTypography>
                  <InlineTypography> / My Queries</InlineTypography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ pt: '10px' }}>
              <RaiseQuery studentCode={auth?.user?.studentCode} getQueriesList={getQueriesList} />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            <DataGrid
              loading={loading}
              autoHeight
              pagination
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              rows={response?.data}
              columns={columns}
              disableSelectionOnClick
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  borderRadius: 0,
                  bgcolor: (theme: Theme) => theme.palette.customColors.tableHeaderBg
                }
              }}
              onSelectionModelChange={rows => setSelectedRows(rows)}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              onPageChange={newPage => setPageNumber(newPage + 1)}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default QueryList
