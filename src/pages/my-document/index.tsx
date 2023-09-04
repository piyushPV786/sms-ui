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
import { IconButton } from '@mui/material'
import { Download } from 'mdi-material-ui'
import Chip from '@mui/material/Chip'

// ** Custom Components Imports
import TableHeader from 'src/components/uploaddocument/TableHeader'
import { downloadSuccess, fileType } from 'src/context/common'
import { successToast } from '../../@core/components/common/Toast'
import { StudentService, CommonService } from 'src/service'
import { status } from 'src/context/common'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FileUpload from 'src/components/uploaddocument/FileUpload'
import DeleteDialog from 'src/components/dialog/DeleteDialog'
import { useAuth } from 'src/hooks/useAuth'
import { getFileUrl, minTwoDigits, serialNumber } from 'src/utils'
import { IDocumentType, IUploadDocumentParam } from 'src/context/types'
import { CircularProgress } from '@mui/material'

interface fileTypes {
  [key: string]: ThemeColor
}

const fileTypeObj: fileTypes = {
  [fileType.doc]: 'info',
  [fileType.ppt]: 'error',
  [fileType.pdf]: 'error',
  [fileType.png]: 'error'
}

interface IIndex {
  api: {
    getRowIndex: (arg0: number) => number
  }
  row: {
    id: number
  }
}

interface CellType {
  row: IDocumentType
}

const DocumentList = () => {
  // ** State

  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [documentResponse, setDocumentResponse] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [viewFileLoader, setViewFileLoader] = useState<{ [key: string]: boolean }>()

  const auth = useAuth()

  const getUserDocumentList = async () => {
    setLoading(true)
    if (auth?.user?.studentCode) {
      const response = await StudentService?.getUserDocument(auth?.user?.studentCode)
      if (response?.data?.statusCode === status.successCode && response?.data?.data) {
        setDocumentResponse(response?.data?.data)
      }
    }
    setLoading(false)
  }

  const uploadFile = async (payload: IUploadDocumentParam): Promise<any | undefined> => {
    const newPayload = {
      fileName: payload.file.name,
      fileType: payload.file.type.split('/').pop(),
      studentCode: auth?.user?.studentCode,
      documentTypeCode: payload.file.type,
      status: 'ADMISSION-APPROVED'
    }
    const myArray: any = []
    const newArray = [...myArray, newPayload]
    const body = {
      files: newArray
    }
    const documentResponse = await StudentService?.addStudentDocument(body)

    if (documentResponse?.status === status.successCodeOne) {
      const documentUploadResponse = await CommonService?.documentUpload({
        filename: payload.file.name,
        filetype: payload.file.type,
        file: payload.file
      })
      if (documentUploadResponse) {
        getUserDocumentList()
      }
    }
  }

  const deleteDocument = async (documentCode: string) => {
    const deleteResponse = await StudentService.deleteStudentDocuments(documentCode)
    if (deleteResponse?.statusCode == status?.successCode) {
      getUserDocumentList()
    }
  }

  useEffect(() => {
    getUserDocumentList()
  }, [])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleView = (fileName: string, fileCode: string) => {
    successToast(downloadSuccess.download)
    setViewFileLoader(prev => ({ ...prev, [fileCode]: true }))
    getFileUrl(fileName, setViewFileLoader, fileCode)
  }

  const setCurrentDateTime = (createdAt: string) => {
    const currentDate = new Date(createdAt)
    const formattedTime = currentDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const formattedDate = currentDate?.toLocaleDateString()
    const formattedDateTime = `${formattedDate} ${formattedTime}`

    return formattedDateTime
  }

  const columns = [
    {
      field: 'id',
      minWidth: 10,
      headerName: '#',
      renderCell: (index: IIndex) => {
        return <Box>{`${minTwoDigits(serialNumber(index.api.getRowIndex(index.row.id), pageNumber, pageSize))}`}</Box>
      }
    },
    {
      flex: 0.1,
      field: 'name',
      minWidth: 200,
      headerName: 'File Name'
    },
    {
      flex: 0.1,
      field: 'fileExtension',
      minWidth: 70,
      headerName: 'File Type',
      renderCell: ({ row }: CellType) => (
        <Chip
          label={row.fileExtension}
          color={fileTypeObj[row.fileExtension]}
          size='small'
          sx={{ textTransform: 'lowercase', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    },
    {
      flex: 0.1,
      field: 'fileSize',
      minWidth: 100,
      headerName: 'File Size',
      renderCell: ({ row }: CellType) => <Typography>{row.fileSize ? row.fileSize : '-'}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 180,
      field: 'createdAt',
      headerName: 'Upload DATE & Time',
      renderCell: ({ row }: CellType) => <Typography>{setCurrentDateTime(row.createdAt)}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (row: CellType) => {
        const { code, name } = row?.row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {viewFileLoader && viewFileLoader[code] ? (
              <CircularProgress color='primary' size={20} />
            ) : (
              <Tooltip title='Download'>
                <Box>
                  <IconButton
                    size='small'
                    component='a'
                    color='primary'
                    sx={{ textDecoration: 'none', mr: 0.5, pt: 2 }}
                    onClick={() => handleView(name, code)}
                  >
                    <Download />
                  </IconButton>
                </Box>
              </Tooltip>
            )}
            <DeleteDialog deleteStudentDocument={deleteDocument} data={row} />
          </Box>
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
              <Typography sx={{ mb: 3, lineHeight: '2rem', fontWeight: 'bold', fontSize: 18 }}>My Documents</Typography>
              <Grid item xs={12}>
                <Box display={'flex'}>
                  <Typography style={{ color: '#4C9457' }}>Dashboard</Typography> / My Documents
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
              rows={documentResponse}
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
          <FileUpload uploadFile={uploadFile} />
        </Grid>
      </Grid>
    </>
  )
}

export default DocumentList
