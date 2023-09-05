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

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value } = props

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
        <Typography sx={{ color: '#4C9457' }} variant='h6'>
          LIST OF FILES
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end' }}>
        <TextField
          size='small'
          variant='standard'
          value={value}
          placeholder='Search...'
          sx={{ mr: 4, mb: 2, maxWidth: '280px' }}
        />
      </Box>
    </Box>
  )
}

export default TableHeader
