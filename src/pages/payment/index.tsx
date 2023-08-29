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

//import { InvoiceType } from 'src/types/apps/invoiceTypes'
import { StudentService } from 'src/service'
import { status } from 'src/context/common'

// ** Custom Components Imports
import TableHeader from 'src/components/feePayment/TableHeader'
import UpdatePayment from 'src/components/feePayment/updatepayment'
import ChangePayment from 'src/components/feePayment/changePaymentMode'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { InlineTypography, StyledTypography } from 'src/styles/styled'
import { useAuth } from 'src/hooks/useAuth'

const initialState = {
  statusCode: 1,
  message: '',
  data: []
}

const defaultColumns = [
  {
    flex: 0.1,
    field: 'feeCategory',
    minWidth: 150,
    headerName: 'FEE CATEGORY'
  },
  {
    flex: 0.1,
    field: 'amount',
    minWidth: 50,
    headerName: 'AMOUNT'
  },
  {
    flex: 0.1,
    minWidth: 50,
    field: 'paidDate',
    headerName: 'PAID DATE'
  }
]

const PaymentList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [response, setResponse] = useState<any>(initialState)
  const [loading, setLoading] = useState<boolean>(false)

  const auth = useAuth()

  const getFeePaymentList = async () => {
    const payload = {
      q: value,
      pageSize: pageSize,
      pageNumber: pageNumber
    }
    setLoading(true)
    if (auth?.user?.studentCode) {
      const response = await StudentService?.getFeePaymentList(payload, auth?.user?.studentCode)
      if (response?.data?.statusCode === status.successCode && response?.data) {
        setResponse(response?.data)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    getFeePaymentList()
  }, [value, pageNumber, pageSize])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 150,
      field: 'dueDate',
      headerName: 'DUE DATE'
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'paymenttype',
      headerName: 'PAYMENT TYPE'
    },

    {
      flex: 0.1,
      minWidth: 200,
      field: 'refernceId',
      headerName: 'TANSACTION/REFERNCE ID'
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={12}>
              <Typography sx={{ mb: 3, lineHeight: '2rem', fontWeight: 'bold', fontSize: 18 }}>
                FEE & PAYMENT HISTORY
              </Typography>
              <Grid item xs={12}>
                <Box display={'flex'}>
                  <StyledTypography>Dashboard </StyledTypography>
                  <InlineTypography> / Fee & Payment History</InlineTypography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ pt: '10px' }}>
              <ChangePayment />
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
        <Grid item xs={12} md={4}>
          <UpdatePayment />
        </Grid>
      </Grid>
    </>
  )
}

export default PaymentList
