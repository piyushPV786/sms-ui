// ** MUI Imports
import Box from '@mui/material/Box'
import { GridRowId } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import SearchBox from 'src/@core/components/searchinput'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter } = props

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
      <Box sx={{ mt: 1, mb: 2 }}>
        <SearchBox handleFilter={handleFilter} />
      </Box>
    </Box>
  )
}

export default TableHeader
