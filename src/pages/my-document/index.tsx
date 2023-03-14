/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { ThemeColor } from 'src/@core/layouts/types'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import { Alert, IconButton, Snackbar } from '@mui/material'
import { Download } from 'mdi-material-ui'

// import { InvoiceType } from 'src/types/apps/invoiceTypes'

// import { status } from 'src/context/common'

// ** Custom Components Imports
import TableHeader from 'src/components/uploaddocument/TableHeader'
import { fileType } from 'src/context/common'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FileUpload from 'src/components/uploaddocument/FileUpload'
import DeleteDialog from 'src/components/dialog/DeleteDialog'
import CustomChip from 'src/@core/components/mui/chip'

// interface CellType {}

interface fileTypes {
  [key: string]: ThemeColor
}

const fileTypeObj: fileTypes = {
  [fileType.doc]: 'info',
  [fileType.ppt]: 'error',
  [fileType.pdf]: 'error'
}

const defaultColumns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 30,
    headerName: '#'
  },
  {
    flex: 0.1,
    field: 'name',
    minWidth: 200,
    headerName: 'File Name'
  }
]

const DocumentList = () => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [response, setResponse] = useState([])
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)

  const [loading, setLoading] = useState<boolean>(false)

  console.log(pageNumber)
  console.log(setLoading)

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const Downloaddoc = () => {
    setOpen(true)
    setResponse([])
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      field: 'type',
      minWidth: 70,
      headerName: 'File Type',
      renderCell: ({ row }: any) => (
        <CustomChip
          skin='light'
          size='small'
          label={row.type}
          color={fileTypeObj[row.type]}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    },
    {
      flex: 0.1,
      field: 'size',
      minWidth: 70,
      headerName: 'File Size'
    },
    {
      flex: 0.1,
      minWidth: 180,
      field: 'datetime',
      headerName: 'Upload DATE & Time'
    },
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Download'>
            <Box>
              <IconButton size='small' component='a' color='primary' sx={{ textDecoration: 'none', mr: 0.5 }}>
                <Download onClick={Downloaddoc} />
              </IconButton>
            </Box>
          </Tooltip>
          <DeleteDialog />
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={12}>
              <Typography sx={{ mb: 3, lineHeight: '2rem', fontWeight: 'bold', fontSize: 18 }}>My Documents</Typography>
              <Grid item xs={12}>
                <Box display={'flex'}>
                  <Typography style={{ color: '#4C9457' }}>Dashboard</Typography>/ My Documents
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={8} xs={12}>
          <Card>
            <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            <DataGrid
              loading={loading}
              autoHeight
              pagination
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              rows={response}
              columns={columns}
              disableSelectionOnClick
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  borderRadius: 0,
                  bgcolor: theme => theme.palette.customColors.tableHeaderBg
                }
              }}
              onSelectionModelChange={rows => setSelectedRows(rows)}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              onPageChange={newPage => setPageNumber(newPage + 1)}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <FileUpload />
        </Grid>

        <Snackbar
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={open}
          onClose={() => setOpen(false)}
          key={'bottom'}
        >
          <Alert onClose={() => setOpen(false)} severity='success' sx={{ width: '100%' }}>
            File downloaded Sucessfully.{' '}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  )
}

export default DocumentList
