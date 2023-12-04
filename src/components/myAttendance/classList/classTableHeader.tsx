// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ClassTableHeader = (props: TableHeaderProps) => {
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
        <Typography variant='h6' sx={{ color: '#008554' }}>
          Class List
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end' }}>
        <TextField
          onChange={e => props?.handleFilter(e.target.value)}
          size='small'
          id='filled-search'
          placeholder='Search...'
          type='search'
          variant='outlined'
        />
      </Box>
    </Box>
  )
}

export default ClassTableHeader
