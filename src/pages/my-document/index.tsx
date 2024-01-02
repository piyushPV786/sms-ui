/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import { CardContent, IconButton, Link } from '@mui/material'
import { Download } from 'mdi-material-ui'

// ** Custom Components Imports
import TableHeader from 'src/components/uploaddocument/TableHeader'
import { ICommonData, downloadSuccess } from 'src/context/common'
import { StudentService, CommonService } from 'src/service'
import { status } from 'src/context/common'
import { successToastBottomRight } from '../../components/common'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FileUpload from 'src/components/uploaddocument/FileUpload'

// import DeleteDialog from 'src/components/dialog/DeleteDialog'
import { useAuth } from 'src/hooks/useAuth'
import { DDMMYYYDateFormat, getFileUrl, getFileUrlToShow, minTwoDigits, serialNumber } from 'src/utils'
import { IDocumentType, IUploadDocumentParam } from 'src/context/types'
import { CircularProgress } from '@mui/material'
import { StyledLink } from 'src/styles/styled'

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
  const [documentType, setDocumentType] = useState<ICommonData[]>([])

  const auth = useAuth()

  const getUserDocumentList = async () => {
    setLoading(true)
    const params = {
      q: value,
      pageSize: pageSize,
      pageNumber: pageNumber
    }
    if (auth?.user?.studentCode) {
      const response = await StudentService?.getUserDocument(params, auth?.user?.studentCode)

      if (response?.data?.statusCode === status.successCode && response?.data?.data?.data) {
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
      documentTypeCode: payload.fileType,
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
        file: payload.file,
        studentCode: auth?.user?.studentCode
      })
      if (documentUploadResponse) {
        successToastBottomRight(`${payload.file.name} ${downloadSuccess.upload}`)
        getUserDocumentList()
      }
    }
  }

  const fetchDocumentType = async () => {
    const projectDocument = false
    const response = await CommonService.getDocumentType(projectDocument)
    setDocumentType(response)
  }

  // const deleteDocument = async (documentCode: string) => {
  //   const deleteResponse = await StudentService.deleteStudentDocuments(documentCode)
  //   if (deleteResponse?.statusCode == status?.successCode) {
  //     getUserDocumentList()
  //   }
  // }

  useEffect(() => {
    fetchDocumentType()
    getUserDocumentList()
  }, [value, pageSize, pageNumber])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleView = (fileName: string, fileCode: string) => {
    successToastBottomRight(`${fileName} ${downloadSuccess.download}`)
    setViewFileLoader(prev => ({ ...prev, [fileCode]: true }))
    getFileUrl(fileName, auth?.user?.studentCode, setViewFileLoader, fileCode)
  }

  const handleShow = (fileName: string, fileCode: string) => {
    getFileUrlToShow(fileName, auth?.user?.studentCode, setViewFileLoader, fileCode)
  }

  const setCurrentDateTime = (createdAt: string) => {
    const currentDate = new Date(createdAt)
    const formattedTime = currentDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const formattedDate = DDMMYYYDateFormat(currentDate)
    const formattedDateTime = `${formattedDate} ${formattedTime}`

    return formattedDateTime
  }

  const columns = [
    {
      field: 'id',
      minWidth: 10,
      maxWidth: 50,
      headerName: '#',
      renderCell: (index: IIndex) => {
        return <Box>{`${minTwoDigits(serialNumber(index.api.getRowIndex(index.row.id), pageNumber, pageSize))}`}</Box>
      }
    },
    {
      flex: 0.1,
      field: 'name',
      minWidth: 200,
      headerName: 'File Name',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip placement='top' title={row?.name}>
              <StyledLink sx={{ fontSize: 12 }} onClick={() => handleShow(row?.name, row?.code)}>
                {row?.name}
              </StyledLink>
            </Tooltip>
          </Box>
        )
      }
    },

    {
      flex: 0.1,
      field: 'documentType',
      minWidth: 200,
      headerName: 'Document Type',
      renderCell: ({ row }: CellType) => (
        <Typography variant='h6'>{row.documentTypeCode ? row.documentTypeCode : '-'}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 170,
      field: 'createdAt',
      headerName: 'Upload DATE & Time',
      renderCell: ({ row }: CellType) => <Typography>{setCurrentDateTime(row.createdAt)}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 100,
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

            {/* <DeleteDialog deleteStudentDocument={deleteDocument} data={row} /> */}
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
              <Typography sx={{ lineHeight: '2rem', fontWeight: 'bold', fontSize: 18 }}>My Documents</Typography>
              <Grid item xs={12}>
                <Box display={'flex'}>
                  <Link href='/student/dashboard/'>Dashboard</Link> / My Documents
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={8} xs={12}>
          <Card>
            <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            <CardContent>
              {documentResponse?.data?.length > 0 && (
                <DataGrid
                  loading={loading}
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
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <FileUpload uploadFile={uploadFile} documentType={documentType} />
        </Grid>
      </Grid>
    </>
  )
}

export default DocumentList
