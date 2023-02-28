// ** MUI Imports
import Box from '@mui/material/Box'

import TextField from '@mui/material/TextField'

const TableHeader = ({ value, handleFilter }: any) => {
    return (
        <Box
            sx={{
                p: 5,
                pb: 3,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: "flex-end"
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

        </Box>
    )
}

export default TableHeader
