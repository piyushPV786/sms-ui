// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

import { CalendarColors } from 'src/types/calendarTypes'

// ** FullCalendar & App Components Imports

import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'

// ** Actions

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Calendar from 'src/components/calender/Calendar'
import SidebarLeft from 'src/components/calender/SidebarLeft'
import AddEventSidebar from 'src/components/calender/AddEventSidebar'

// ** CalendarColors
const calendarsColor: CalendarColors = {
  Assessments: 'error',
  Schedules: 'primary',
  Announcements: 'warning',
  Holiday: 'success',
  Others: 'info'
}

const store = {
  events: [
    {
      id: 1,
      url: '',
      title: 'Design Review',
      start: '2023-08-28T13:55:01.838Z',
      end: '2023-08-29T13:55:01.838Z',
      allDay: false,
      extendedProps: {
        calendar: 'Schedules'
      }
    },
    {
      id: 2,
      url: '',
      title: 'Meeting With Client',
      start: '2023-08-19T18:30:00.000Z',
      end: '2023-08-20T18:30:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Schedules'
      }
    },
    {
      id: 3,
      url: '',
      title: 'Family Trip',
      allDay: true,
      start: '2023-08-21T18:30:00.000Z',
      end: '2023-08-23T18:30:00.000Z',
      extendedProps: {
        calendar: 'Holiday'
      }
    },
    {
      id: 4,
      url: '',
      title: "Doctor's Appointment",
      start: '2023-08-19T18:30:00.000Z',
      end: '2023-08-20T18:30:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Assessments'
      }
    },
    {
      id: 5,
      url: '',
      title: 'Dart Game?',
      start: '2023-08-17T18:30:00.000Z',
      end: '2023-08-18T18:30:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Others'
      }
    },
    {
      id: 6,
      url: '',
      title: 'Meditation',
      start: '2023-08-17T18:30:00.000Z',
      end: '2023-08-18T18:30:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Assessments'
      }
    },
    {
      id: 7,
      url: '',
      title: 'Dinner',
      start: '2023-08-17T18:30:00.000Z',
      end: '2023-08-18T18:30:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Announcements'
      }
    },
    {
      id: 8,
      url: '',
      title: 'Product Review',
      start: '2023-08-17T18:30:00.000Z',
      end: '2023-08-18T18:30:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Schedules'
      }
    },
    {
      id: 9,
      url: '',
      title: 'Monthly Meeting',
      start: '2023-08-31T18:30:00.000Z',
      end: '2023-08-31T18:30:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Schedules'
      }
    },
    {
      id: 10,
      url: '',
      title: 'Monthly Checkup',
      start: '2023-06-30T18:30:00.000Z',
      end: '2023-06-30T18:30:00.000Z',
      allDay: true,
      extendedProps: {
        calendar: 'Assessments'
      }
    }
  ],
  selectedEvent: null,
  selectedCalendars: ['Assessments', 'Schedules', 'Announcements', 'Holiday', 'Others']
}

const AppCalendar = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState<null | any>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)

  // ** Hooks
  const { settings } = useSettings()

  // ** Vars
  const leftSidebarWidth = 260

  //const addEventSidebarWidth = 400

  const { skin, direction } = settings
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  const addEvent = () => {}

  const fetchEvents = () => {}

  const deleteEvent = () => {}

  const updateEvent = () => {}

  const handleSelectEvent = () => {}

  const handleAllCalendars = () => {}

  const handleCalendarsUpdate = () => {}

  return (
    <CalendarWrapper
      className='app-calendar'
      sx={{
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
      }}
    >
      <SidebarLeft
        store={store}
        mdAbove={mdAbove}
        calendarsColor={calendarsColor}
        leftSidebarOpen={leftSidebarOpen}
        leftSidebarWidth={leftSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        handleAllCalendars={handleAllCalendars}
        handleCalendarsUpdate={handleCalendarsUpdate}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      />
      <Box
        sx={{
          pb: 5,
          px: 5,
          pt: 2.25,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
          ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
        }}
      >
        <Calendar
          store={store}
          direction={direction}
          updateEvent={updateEvent}
          calendarApi={calendarApi}
          calendarsColor={calendarsColor}
          setCalendarApi={setCalendarApi}
          handleSelectEvent={handleSelectEvent}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </Box>
      {/* <AddEventSidebar
        store={store}
        addEvent={addEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
        calendarApi={calendarApi}
        drawerWidth={addEventSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        addEventSidebarOpen={addEventSidebarOpen}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      /> */}
    </CalendarWrapper>
  )
}

export default AppCalendar
