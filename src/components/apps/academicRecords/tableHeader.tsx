// ** MUI Imports
import Box from '@mui/material/Box'
import { Button } from '@mui/material'

import TextField from '@mui/material/TextField'
import Download from 'mdi-material-ui/Download'

const TableHeader = ({ value, handleFilter, handleOnDownloadClick }: any) => {
  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search...'
          sx={{ mr: 4, mb: 2, maxWidth: '280px' }}
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          size='medium'
          startIcon={<Download />}
          variant='outlined'
          sx={{
            backgroundColor: theme => theme.palette.common.white,
            color: theme => theme.palette.primary.light,
            borderColor: theme => theme.palette.primary.light
          }}
          onClick={handleOnDownloadClick}
        >
          DOWNLOAD
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
