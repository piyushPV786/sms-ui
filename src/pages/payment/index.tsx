/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import { Theme, Tooltip } from '@mui/material'

//import { InvoiceType } from 'src/types/apps/invoiceTypes'
import { AcademicService, CommonService, StudentService } from 'src/service'
import { status } from 'src/context/common'

// ** Custom Components Imports
import TableHeader from 'src/components/feePayment/TableHeader'
import UpdatePayment from 'src/components/feePayment/updatepayment'
import ChangePayment from 'src/components/feePayment/changePaymentMode'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { InlineTypography, StyledTypography } from 'src/styles/styled'
import { useAuth } from 'src/hooks/useAuth'
import { IProgram, IPaymentRow } from 'src/types/common'
import { DDMMYYYDateFormat, getSymbol } from 'src/utils'

const initialState = {
  message: '',
  data: [],
  programCode: ''
}

const PaymentList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [response, setResponse] = useState<any>(initialState)
  const [loading, setLoading] = useState<boolean>(false)
  const [allProgram, setAllProgram] = useState<IProgram | undefined>(undefined)
  const [currencyList, setCurrencyList] = useState<[]>([])

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
      if (response?.data?.statusCode === status.successCode && response?.data?.data) {
        setResponse(response?.data?.data)
      }
    }
    setLoading(false)
  }

  const getAllPrograms = async () => {
    const response = await AcademicService?.getallPrograms()
    if (response?.data?.statusCode === status.successCode && response?.data?.data) {
      setAllProgram(response?.data?.data)
    }
  }
  const getAllCurrencyList = async () => {
    const response = await CommonService.getCurrencyList()
    if (response?.status === status?.successCode) {
      setCurrencyList(response?.data?.data)
    }
  }

  useEffect(() => {
    getAllPrograms()
    getAllCurrencyList()
  }, [])

  useEffect(() => {
    getFeePaymentList()
  }, [value, pageNumber, pageSize])

  const handleFilter = (val: string) => {
    setValue(val)
  }
  const UpcomingPayment: [] =
    response?.data &&
    response.data.filter(
      (item: { dueDate: string | null; dueAmount: number | null }) => item.dueDate !== null && item.dueAmount !== null
    )

  const columns = [
    {
      flex: 0.1,
      field: 'programName',
      minWidth: 300,
      headerName: 'Qualification',
      renderCell: (row: IPaymentRow) => {
        return (
          <Tooltip title={row.row.programName} describeChild placement='top-start'>
            <Typography variant='body2' sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {row.row.programName ? row.row.programName : '-'}
            </Typography>
          </Tooltip>
        )
      }
    },
    {
      flex: 0.1,
      field: 'feeModeCode',
      minWidth: 150,
      headerName: 'Payment Mode'
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'totalAmount',
      headerName: 'Amount',
      renderCell: (row: IPaymentRow) => {
        return (
          <Typography variant='body2'>
            {getSymbol(currencyList, row.row.currencyCode)}
            &nbsp;
            {`R ${row.row.totalAmount}`}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'paymentDate',
      headerName: 'PAID DATE',
      renderCell: (row: IPaymentRow) => {
        return (
          <Typography variant='body2'>
            {row.row.paymentDate ? DDMMYYYDateFormat(new Date(row.row.paymentDate)) : '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'dueDate',
      headerName: 'DUE DATE',
      renderCell: (row: IPaymentRow) => {
        return (
          <Typography variant='body2'>
            {row.row.dueDate ? DDMMYYYDateFormat(new Date(row.row.dueDate)) : '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'paymentType',
      headerName: 'PAYMENT TYPE'
    },

    {
      flex: 0.1,
      minWidth: 300,
      field: 'referenceNumber',
      headerName: 'TRANSACTION / REFERENCE ID',
      renderCell: (row: IPaymentRow) => {
        return (
          <Tooltip title={row.row.transactionId} describeChild placement='top-start'>
            <Typography variant='body2' sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {row?.row?.transactionId ? row?.row?.transactionId : '-'}
            </Typography>
          </Tooltip>
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
        <Grid item md={UpcomingPayment?.length === 0 ? 12 : 8} xs={12}>
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
        {UpcomingPayment.length > 0 ? (
          <Grid item xs={12} md={4}>
            <UpdatePayment
              currencyList={currencyList}
              allProgram={allProgram}
              rows={UpcomingPayment}
              programCode={response.programCode}
            />
          </Grid>
        ) : null}
      </Grid>
    </>
  )
}

export default PaymentList
