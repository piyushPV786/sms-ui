// ** MUI Imports
import Box from '@mui/material/Box'
import { GridRowId } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableHeader = (props: TableHeaderProps) => {
  // ** Props

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end' }}>
        <Typography variant='h6'>FEE & PAYMENT HISTORY</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end' }}>
        <TextField size='small' id='filled-search' placeholder='Search...' type='search' variant='standard' />
      </Box>
    </Box>
  )
}

export default TableHeader
