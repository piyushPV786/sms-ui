import Box from '@mui/material/Box'
import { GridRowId } from '@mui/x-data-grid'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import CommonDueAmount from '../commonDueAmount'
import { Grid } from '@mui/material'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
  fintechData: any
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
      <Typography variant='h6' sx={{ flex: 1 }}>
        FEE & PAYMENT HISTORY
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Box>
          <TextField
            onChange={e => props?.handleFilter(e.target.value)}
            size='small'
            placeholder='Search...'
            type='search'
            variant='outlined'
          />
        </Box>
        <Grid item borderRight={theme => `1px solid ${theme.palette.grey[500]}`} />

        <Box>
          <CommonDueAmount fintechData={props?.fintechData} />
        </Box>
      </Box>
    </Box>
  )
}

export default TableHeader
