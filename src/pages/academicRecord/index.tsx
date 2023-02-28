import { Grid, Typography } from '@mui/material'
import { bgcolor, Box } from '@mui/system'
import Assignments from 'src/components/dashboard/Assignments'
import Classes from 'src/components/dashboard/Classes'
import MyDays from 'src/components/dashboard/MyDays'
import Program from 'src/components/dashboard/Program'
import StudentDetails from 'src/components/dashboard/StudentDetails'
import Card from '@mui/material/Card'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import TableHeader from 'src/components/apps/academicRecords/tableHeader'
const StudentDashboard = () => {


    type InvoiceType = {
        year: string
        courseCode: string
        courseName: string

        digitalAssessment: string
        assignments: string
        examination: string
        total: string
        symbol: string
        status: string

    }

    interface CellType {
        row: InvoiceType
    }

    const defaultColumns = [
        {

            flex: 0.1,
            field: 'year',
            minWidth: 76,
            headerName: 'Year',
            renderCell: ({ row }: CellType) => (
                <Typography variant='body2'>{row.year}</Typography>
            )
        },
        {
            flex: 0.25,
            field: 'courseCode',
            minWidth: 240,
            headerName: 'Course Code',
            renderCell: ({ row }: CellType) => (
                <Typography variant='body2'>{row.courseCode}</Typography>
            )
        },
        {
            flex: 0.25,
            field: 'courseName',
            minWidth: 240,
            headerName: 'Course Name',
            renderCell: ({ row }: CellType) => (
                <Typography variant='body2'>{row.courseCode}</Typography>
            )
        },

        {
            flex: 0.1,
            minWidth: 300,
            field: ' digitalAssessment',
            headerName: ' Digital Assessment',
            renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.digitalAssessment}</Typography>
        },
        {
            flex: 0.1,
            minWidth: 150,
            field: 'assignments',
            headerName: 'Assignments',
            renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.assignments}</Typography>
        },
        {
            flex: 0.1,
            minWidth: 150,
            field: 'examination',
            headerName: 'Examination',
            renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.examination}</Typography>
        },

        {
            flex: 0.1,
            minWidth: 200,
            field: 'total',
            headerName: 'Total(100%)',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography variant='body2'>{row.total}</Typography>
                )
            }
        },

        {
            flex: 0.1,
            minWidth: 200,
            field: 'symbol',
            headerName: 'Symbol',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography>{row.symbol}</Typography>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 200,
            field: 'status',
            headerName: 'Status',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography>{row.status}</Typography>
                )
            }
        }
    ]

    const data = [

        {
            id: 1,
            year: "2022",
            courseCode: "MBA",
            courseName: "Business Research",
            contact: "Business Research",
            digitalAssessment: "12.0",
            assignments: "12.5",
            examination: "40.0",
            total: "64.5",
            symbol: "B",
            status: "pass",

        }, {
            id: 2,
            year: "2022",
            courseCode: "MBA",
            courseName: "Business Research",
            contact: "Business Research",
            digitalAssessment: "12.0",
            assignments: "12.5",
            examination: "40.0",
            total: "64.5",
            symbol: "B",
            status: "pass",

        }]



    return (
        <Grid container spacing={6}>


            <Grid item xs={12}>
                <Typography variant='h5' gutterBottom>
                    Academic Records
                    <Typography variant='h6' >
                        Dashboard/Academic Records
                    </Typography>

                </Typography>
                <Card >

                    < MuiCardContent sx={{ backgroundColor: 'rgb(80,149,142)' }} >
                        <Grid container >
                            <Grid item xs={2.4} >
                                <Typography variant='body2'>Student Number</Typography>
                                <Typography sx={{ mt: 2 }} variant='body2'>REG12536253</Typography>
                            </Grid>
                            <Grid item xs={2.4} >
                                <Typography variant='body2'>Full Name</Typography>
                                <Typography sx={{ mt: 2 }} variant='body2'>Student Number</Typography>
                            </Grid>
                            <Grid item xs={2.4}  >
                                <Typography variant='body2'>ID Number</Typography>
                                <Typography sx={{ mt: 2 }} variant='body2'>128918291829812</Typography>
                            </Grid>
                            <Grid item xs={2.4}  >
                                <Typography variant='body2'>Date Of Birth</Typography>
                                <Typography sx={{ mt: 2 }} variant='body2'>25-08-1986</Typography>
                            </Grid>
                            <Grid item xs={2.4}  >
                                <Typography variant='body2'>Qualification</Typography>
                                <Typography sx={{ mt: 2 }} variant='body2'>Master of Business Administration
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid container sx={{ mt: 4 }}>
                            <Grid item xs={2.4}  >
                                <Typography variant='body2'>NQF Level</Typography>
                                <Typography sx={{ mt: 2 }} variant='body2'>5</Typography>
                            </Grid>
                            <Grid item xs={2.4}  >
                                <Typography variant='body2'>Date of Registration</Typography>
                                <Typography sx={{ mt: 2 }} variant='body2'>09 February 2022
                                </Typography>
                            </Grid>
                            <Grid item xs={2.4}  >
                                <Typography variant='body2'>Status</Typography>
                                <Typography sx={{ mt: 2 }} variant='body2'>Qualification in Progress</Typography>
                            </Grid>
                            <Grid item xs={2.5}  >
                                <Typography variant='body2'>Graduation Date
                                    <Typography sx={{ mt: 2 }} variant='body2'>-</Typography>
                                </Typography>
                            </Grid>
                        </Grid>


                    </MuiCardContent>
                </Card>
                <Grid item xs={12} mt={12}>

                    <Card>
                        <TableHeader />

                        <DataGrid
                            // loading={loading}
                            autoHeight
                            pagination
                            paginationMode='server'
                            disableColumnMenu
                            disableColumnFilter
                            disableColumnSelector
                            rows={data}
                            rowCount={5}
                            columns={defaultColumns}
                            disableSelectionOnClick
                            // pageSize={Number(pageSize)}
                            rowsPerPageOptions={[10, 25, 50]}
                            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                        // onSelectionModelChange={rows => setSelectedRows(rows)}
                        // onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                        // onPageChange={newPage => setPageNumber(newPage + 1)}
                        />

                    </Card>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default StudentDashboard
