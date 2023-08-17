// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import LogoutVariant from 'mdi-material-ui/LogoutVariant'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { getUserInfo } from 'src/utils'

interface Props {
  settings: Settings
}

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }
  getUserInfo()

  // const styles = {
  //   py: 2,
  //   px: 4,
  //   width: '100%',
  //   display: 'flex',
  //   alignItems: 'center',
  //   color: 'text.primary',
  //   textDecoration: 'none',
  //   '& svg': {
  //     fontSize: '1.375rem',
  //     color: 'text.secondary'
  //   }
  // }

  const handleLogout = () => {
    logout()
    handleDropdownClose()

    return null
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={`${process.env.NEXT_PUBLIC_STUDENT_BASE_URL}/images/avatars/1.png`}
        />
      </Badge>
      <Box
        onClick={handleDropdownOpen}
        sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}
      >
        <Typography sx={{ fontWeight: 600 }}>{getUserInfo()?.fullName}</Typography>
        <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
          {getUserInfo()?.email}
        </Typography>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}></Box>
        </Box>
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
