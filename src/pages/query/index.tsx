/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import { CircularProgress, Theme, Tooltip, styled } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'

import { CommonService, StudentService } from 'src/service'
import { IIntakeStatusType, IntakeStatus, status } from 'src/context/common'

// ** Custom Components Imports
import TableHeader from 'src/components/query/TableHeader'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { InlineTypography, StyledTypography } from 'src/styles/styled'
import { useAuth } from 'src/hooks/useAuth'
import RaiseQuery from 'src/components/dialog/RaiseQuery'
import { DDMMYYDateFormate, getFileUrlToShow, getName, minTwoDigits, serialNumber } from 'src/utils'
import { CellType, IDefaultValue, IIndex, IQueryStatus, IQueryType } from 'src/types/common'

const initialState = {
  message: '',
  data: [],
  statusCode: ''
}

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

const StyledDataGrid = styled(DataGrid)(() => ({
  maxHeight: 'none !important',
  '& .MuiDataGrid-renderingZone': {
    maxHeight: 'none !important'
  },
  '& .MuiDataGrid-cell': {
    lineHeight: 'unset !important',
    maxHeight: 'none !important',
    whiteSpace: 'normal'
  },
  '& .MuiDataGrid-row': {
    maxHeight: 'none !important'
  }
}))

const QueryList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [response, setResponse] = useState<IDefaultValue>(initialState)
  const [loading, setLoading] = useState<boolean>(false)
  const [category, setCategory] = useState<IQueryType[]>([])
  const [queryStatus, setQueryStatus] = useState<IQueryStatus[]>([])
  const [viewFileLoader, setViewFileLoader] = useState<{ [key: string]: boolean }>()

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

  const getQueryTypeList = async () => {
    const response = await CommonService.getQueryType()
    if (response?.status === status?.successCode) {
      setCategory(response?.data?.data)
    }
  }

  const getQueryStatusList = async () => {
    const response = await CommonService.getQueryStatus()
    if (response?.status === status?.successCode) {
      setQueryStatus(response?.data?.data)
    }
  }

  useEffect(() => {
    getQueriesList()
  }, [value, pageNumber, pageSize])

  useEffect(() => {
    getQueryTypeList()
    getQueryStatusList()
  }, [])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleView = (fileName: string, fileCode: string) => {
    setViewFileLoader(prev => ({ ...prev, [fileCode]: true }))
    getFileUrlToShow(fileName, auth?.user?.studentCode, setViewFileLoader, fileCode)
  }

  const columns = [
    {
      flex: 0.1,
      field: '#',
      minWidth: 60,
      headerName: 'ID',
      renderCell: (index: IIndex) => {
        return <Box>{`${minTwoDigits(serialNumber(index.api.getRowIndex(index.row.id), pageNumber, pageSize))}`}</Box>
      }
    },
    {
      flex: 0.1,
      field: 'subject',
      minWidth: 300,
      headerName: 'Subject'
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'queryType',
      headerName: 'Query Type',
      renderCell: (row: CellType) => {
        return <Typography fontSize='small'>{getName(category, row.row.queryType)}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 400,
      field: 'description',
      headerName: 'Description'
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'documentCode',
      headerName: 'Supported Documents',
      renderCell: ({ row }: CellType) => (
        <Box>
          {row?.documentCode ? (
            <>
              {viewFileLoader && viewFileLoader[row?.documentCode] ? (
                <CircularProgress color='primary' size={20} />
              ) : (
                <Tooltip placement='top' arrow disableInteractive title='View'>
                  <Typography
                    fontWeight='bold'
                    color='primary'
                    fontSize='small'
                    onClick={() => handleView(row?.documentName, row?.documentCode)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {row?.documentName}
                  </Typography>
                </Tooltip>
              )}
            </>
          ) : (
            '-'
          )}
        </Box>
      )
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
              <RaiseQuery category={category} studentCode={auth?.user?.studentCode} getQueriesList={getQueriesList} />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            <StyledDataGrid
              loading={loading}
              autoHeight
              pagination
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              rows={response?.data}
              columns={columns as any}
              getRowId={row => row?.id}
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
