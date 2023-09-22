/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { ThemeColor } from 'src/@core/layouts/types'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import { CardContent, IconButton, Link } from '@mui/material'
import { Download } from 'mdi-material-ui'
import Chip from '@mui/material/Chip'

// ** Custom Components Imports
import TableHeader from 'src/components/uploaddocument/TableHeader'
import { ICommonData, downloadSuccess, fileType } from 'src/context/common'
import { StudentService, CommonService } from 'src/service'
import { status } from 'src/context/common'
import { successToastBottomRight } from '../../components/common'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FileUpload from 'src/components/uploaddocument/FileUpload'
import DeleteDialog from 'src/components/dialog/DeleteDialog'
import { useAuth } from 'src/hooks/useAuth'
import { getFileUrl, minTwoDigits, serialNumber } from 'src/utils'
import { IDocumentType, IUploadDocumentParam } from 'src/context/types'
import { CircularProgress } from '@mui/material'
import { StyledLink } from 'src/styles/styled'

interface fileTypes {
  [key: string]: ThemeColor
}

const fileTypeObj: fileTypes = {
  [fileType.doc]: 'info',
  [fileType.ppt]: 'error',
  [fileType.pdf]: 'error',
  [fileType.png]: 'error'
}

const AttendanceList = () => {
  // ** State

  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [documentResponse, setDocumentResponse] = useState<any>([])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const columns = [
    {
      field: 'id',
      minWidth: 10,
      maxWidth: 50,
      headerName: '#'
    },
    {
      flex: 0.1,
      field: 'name',
      minWidth: 200,
      headerName: 'Course Code'
    },
    {
      flex: 0.1,
      field: 'courseName',
      minWidth: 100,
      headerName: 'Course Name'
    },
    {
      flex: 0.1,
      field: 'totalClass',
      minWidth: 140,
      headerName: 'Total Class (In Mins)'
    },
    {
      flex: 0.1,
      minWidth: 170,
      field: 'percent',
      headerName: '%'
    },
    {
      flex: 0.1,
      minWidth: 170,
      field: 'status',
      headerName: 'Status'
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (row: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Download'>
              <Box>
                <IconButton
                  size='small'
                  component='a'
                  color='primary'
                  sx={{ textDecoration: 'none', mr: 0.5, pt: 2 }}
                  // onClick={() => handleView(name, code)}
                >
                  <Download />
                </IconButton>
              </Box>
            </Tooltip>
          </Box>
        )
      }
    }
  ]

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
            <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            <CardContent>
              <DataGrid
                autoHeight
                pagination
                paginationMode='server'
                disableColumnMenu
                disableColumnFilter
                disableColumnSelector
                rows={documentResponse?.data}
                rowCount={documentResponse?.count}
                columns={columns}
                disableSelectionOnClick
                pageSize={Number(pageSize)}
                rowsPerPageOptions={[10, 25, 50]}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    borderRadius: 0,
                    bgcolor: '#d7e2de'
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: '600'
                  }
                }}
                onSelectionModelChange={rows => setSelectedRows(rows)}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                onPageChange={newPage => setPageNumber(newPage + 1)}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default AttendanceList
