// ** MUI Imports
// import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Types
import { SidebarLeftType, CalendarFiltersType } from 'src/types/calendarTypes'

const SidebarLeft = (props: SidebarLeftType) => {
  const {
    store,
    mdAbove,
    calendarsColor,
    leftSidebarOpen,
    leftSidebarWidth,
    handleCalendarsUpdate,
    handleLeftSidebarToggle
  } = props

  const colorsArr = calendarsColor ? Object.entries(calendarsColor) : []

  const renderFilters = colorsArr.length
    ? colorsArr.map(([key, value]: string[]) => {
        return (
          <FormControlLabel
            key={key}
            label={key}
            sx={{ mb: 0.5 }}
            control={
              <Checkbox
                checked={store.selectedCalendars.includes(key as CalendarFiltersType)}
                onChange={() => handleCalendarsUpdate(key as CalendarFiltersType)}
                sx={{ color: `${value}.main`, '&.Mui-checked': { color: `${value}.main` } }}
              />
            }
          />
        )
      })
    : null

  // const handleSidebarToggleSidebar = () => {
  //   handleAddEventSidebarToggle()
  //   handleSelectEvent(null)
  // }

  if (renderFilters) {
    return (
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          disableAutoFocus: true,
          disableScrollLock: true,
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          zIndex: 2,
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            borderRadius: 1,
            boxShadow: 'none',
            width: leftSidebarWidth,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            p: theme => theme.spacing(5),
            zIndex: mdAbove ? '2' : 'drawer',
            position: mdAbove ? 'static' : 'absolute'
          },
          '& .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute'
          }
        }}
      >
        {/* <Button variant='contained' onClick={handleSidebarToggleSidebar}>
          Add Event
        </Button> */}

        <Typography variant='body2' sx={{ mt: 7, mb: 2.5, textTransform: 'uppercase' }}>
          Calendars
        </Typography>

        {colorsArr?.length &&
          colorsArr.map(([key, value]: string[]) => {
            return (
              <FormControlLabel
                key={key}
                label={key}
                sx={{ mb: 0.5 }}
                control={
                  <Checkbox
                    checked={store.selectedCalendars.includes(key as CalendarFiltersType)}
                    onChange={() => handleCalendarsUpdate(key as CalendarFiltersType)}
                    sx={{ color: `${value}.main`, '&.Mui-checked': { color: `${value}.main` } }}
                  />
                }
              />
            )
          })}
      </Drawer>
    )
  } else {
    return null
  }
}

export default SidebarLeft
