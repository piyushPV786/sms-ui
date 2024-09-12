// ** MUI Imports
import Box from '@mui/material/Box'

import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import MenuIcon from 'mdi-material-ui/Menu'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import WhiteButton from 'src/components/Button'
import Link from 'next/link'


interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const regenesysPortalUrl = process.env.NEXT_PUBLIC_REGENIUS_PORTAL_LOGIN_URL ?? '/'

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <MenuIcon />
          </IconButton>
        ) : null}
        <Autocomplete hidden={hidden} settings={settings} />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
      <Link href={`${regenesysPortalUrl}`} passHref legacyBehavior>
  <WhiteButton variant='contained' size='small' sx={{ borderRadius: 10 }}>
    Start Learning
  </WhiteButton>
</Link>

        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}

        <NotificationDropdown settings={settings} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
