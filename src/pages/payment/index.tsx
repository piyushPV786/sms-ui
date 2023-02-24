
/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState } from 'react'


// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import { ThemeColor } from 'src/@core/layouts/types'

//import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Custom Components Imports
import TableHeader from 'src/components/feePayment/TableHeader'
import PreviewActions from 'src/components/feePayment/updatepayment'
import ManagementInfo from 'src/components/feePayment/changePaymentMode'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

interface UserStatusType {
  [key: string]: ThemeColor
}

const userStatusObj: UserStatusType = {
  enrolled: 'primary',
  'RESUB-APP-FEE-PROOF': 'warning',
  sales: 'info',
  ' APP-FEE-ACCEPTED': 'error'
}

interface CellType {

  // row: InvoiceType
  row: any
}
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
    headerName: 'FEE CATEGORY',
   
  },
  {
    flex: 0.1,
    field: 'amount',
    minWidth: 50,
    headerName: 'AMOUNT',
    renderCell: ({ row }: CellType) => {
      const { firstName, lastName, email } = row?.lead

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant='body2'
              sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
            >
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography noWrap variant='caption'>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 50,
    field: 'paidDate',
    headerName: 'PAID DATE',
    
  }
]
interface DataParams {
  q: string
  status: string
  pageSize: number
  pageNumber: number
}

const PaymentList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
 

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 150,
      field: 'dueDate',
      headerName: 'DUE DATE',
     
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'paymenttype',
      headerName: 'PAYMENT TYPE',
    },

    {
      flex: 0.1,
      minWidth: 200,
      field: 'refernceId',
      headerName: 'TANSACTION/REFERNCE ID',
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={12}>
              <Typography className='page-header'>FEE & PAYMENT HISTORY</Typography>
            </Grid>
            <Grid item xs={12}>
              <ManagementInfo />
            </Grid>
          </Box>
        </Grid>
        <Grid item md={8} xs={12}>
          <Card>
            <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <PreviewActions />
        </Grid>
      </Grid>
    </>
  )
}

export default PaymentList
