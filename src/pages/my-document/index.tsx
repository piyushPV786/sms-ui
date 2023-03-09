/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridRowId } from '@mui/x-data-grid'

import { InvoiceType } from 'src/types/apps/invoiceTypes'

// import { status } from 'src/context/common'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// ** Custom Components Imports
import TableHeader from 'src/components/uploaddocument/TableHeader'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FileUpload from 'src/components/uploaddocument/FileUpload'
import { IconButton } from '@mui/material'
import { Delete, Download } from 'mdi-material-ui'

// const initialState = {
//   statusCode: 1,
//   message: '',
//   data: []
// }

interface CellType {
  row: InvoiceType
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
  },
  {
    flex: 0.1,
    field: 'type',
    minWidth: 70,
    headerName: 'File Type'
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
  }
]

//dummy-data
const documents = [
  {
    id: 1,
    name: 'Assessment ',
    type: 'doc',
    size: '1.25MB',
    datetime: '01-12-2022 10:00'
  },
  {
    id: 2,
    name: 'Assessment ',
    type: 'ppt',
    size: '1.45MB',
    datetime: '01-12-2022 10:00'
  },
  {
    id: 3,
    name: 'Assessment ',
    type: 'pdf',
    size: '1.60MB',
    datetime: '01-12-2022 10:00'
  },
  {
    id: 4,
    name: 'Assessment ',
    type: 'ppt',
    size: '1.50MB',
    datetime: '01-12-2022 10:00'
  },
  {
    id: 5,
    name: 'Assessment ',
    type: 'doc',
    size: '2MB',
    datetime: '01-12-2022 10:00'
  },
  {
    id: 6,
    name: 'Assessment ',
    type: 'pdf',
    size: '1.75MB',
    datetime: '01-12-2022 10:00'
  },
  {
    id: 7,
    name: 'Assessment ',
    type: 'pdf',
    size: '1.75MB',
    datetime: '01-12-2022 10:00'
  },
  {
    id: 8,
    name: 'Assessment ',
    type: 'pdf',
    size: '1.75MB',
    datetime: '01-12-2022 10:00'
  }
]

const exportPDF = () => {
  const unit = 'pt'
  const size = 'A4' // Use A1, A2, A3 or A4
  const orientation = 'portrait' // portrait or landscape

  const marginLeft = 40
  const doc = new jsPDF(orientation, unit, size)

  doc.setFontSize(15)

  const title = 'My Awesome Report'
  const headers = [['NAME', 'PROFESSION']]

  const data = documents.map((elt: any) => [elt.name, elt.profession])

  const content = {
    startY: 50,
    head: headers,
    body: data
  }

  doc.text(title, marginLeft, 40)
  doc.autoTable(content)
  doc.save('report.pdf')
}

const DocumentList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)

  // const [response, setResponse] = useState<any>(initialState)
  const [loading, setLoading] = useState<boolean>(false)

  // const getdocumentList = async () => {
  //   const response = await documents?.getdocumentList()
  //   if (response?.data?.statusCode === status.successCode && response?.data) {
  //     setResponse(response?.data?.data)
  //   }
  // }

  // console.log('response', response)

  // console.log('documents', getdocumentList)

  console.log(pageNumber)
  console.log(setLoading)

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Download'>
            <Box>
              <IconButton size='small' component='a' color='primary' sx={{ textDecoration: 'none', mr: 0.5 }}>
                <Download onclick={exportPDF()} />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip title='Delete'>
            <Box>
              <IconButton
                size='small'
                component='a'
                color='primary'
                sx={{ color: 'red', textDecoration: 'none', mr: 0.5 }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Tooltip>
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
              rows={documents}
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
      </Grid>
    </>
  )
}

export default DocumentList
