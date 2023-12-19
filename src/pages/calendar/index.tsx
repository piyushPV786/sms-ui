// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import moment from 'moment'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

import { CalendarColors, EventType } from 'src/types/calendarTypes'

// ** FullCalendar & App Components Imports

import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'

// ** Actions

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Calendar from 'src/components/calender/Calendar'
import SidebarLeft from 'src/components/calender/SidebarLeft'
import DashboardCustomHooks from 'src/components/dashboard/CustomHooks'

// import AddEventSidebar from 'src/components/calender/AddEventSidebar'

// ** CalendarColors

const AppCalendar = () => {
  interface schedulerType {
    digitalAssessmentDueDate: Date | string
    examDate: Date | string
    scheduleDuration: schedulerDurationType[]
    individualAssignmentDueDate: Date | string
  }
  interface schedulerDurationType {
    from: string
    to: string
    date: string
  }

  // ** States

  const [calendarApi, setCalendarApi] = useState<null | any>(['Assessments'])
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [event, setEvent] = useState<EventType[] | undefined>()
  const [filterEvent, setFilterEvent] = useState<EventType[] | undefined>()

  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)
  const { scheduler } = DashboardCustomHooks()
  const defaultSelectedCalendars = ['Assessments', 'Announcements', 'Exams']
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>(defaultSelectedCalendars)

  const parse = () => {
    const eventArr: any = []
    scheduler &&
      scheduler[0]?.courseSchedule?.map((item: schedulerType, i: string) => {
        item &&
          eventArr.push({
            id: `Exam ${i}`,
            url: '',
            title: 'Exam',
            start: item?.examDate,
            end: item?.examDate,
            allDay: false,
            extendedProps: {
              calendar: 'Exams'
            }
          })
        item &&
          eventArr.push({
            id: `Digital-assignment${i}`,
            url: '',
            title: 'Digital assingment',
            start: item?.digitalAssessmentDueDate,
            end: item?.digitalAssessmentDueDate,
            allDay: false,
            extendedProps: {
              calendar: 'Assessments'
            }
          })
        item &&
          eventArr.push({
            id: `individualAssignmentDueDate${i}`,
            url: '',
            title: 'Individual Assignment',
            start: item?.individualAssignmentDueDate,
            end: item?.individualAssignmentDueDate,
            allDay: false,
            extendedProps: {
              calendar: 'Assessments'
            }
          })

        item?.scheduleDuration?.map(item => {
          const date = item?.date
          const FromDate = moment(date)
            .set({
              hour: Number(item?.from?.split(':')[0]),
              minute: Number(item?.from?.split(':')[1]),
              second: Number(item?.from?.split(':')[2])
            })
            .format()
          const ToDate = moment(date)
            .set({
              hour: Number(item?.to?.split(':')[0]),
              minute: Number(item?.to?.split(':')[1]),
              second: Number(item?.to?.split(':')[2])
            })
            .format()

          eventArr.push({
            id: `Duration${i}`,
            url: '',
            title: `Duration`,
            start: FromDate,
            end: ToDate,
            allDay: false,
            extendedProps: {
              calendar: 'Schedules'
            }
          })
        })
      })
    setEvent(eventArr)
    setFilterEvent(eventArr)
  }

  useEffect(() => {
    parse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduler])

  const calendarsColor: CalendarColors = {
    Assessments: 'error',

    Announcements: 'warning',

    Exams: 'info'
  }

  const store = {
    events: event,
    selectedEvent: null,
    selectedCalendars: selectedCalendars
  }

  // ** Hooks
  const { settings } = useSettings()

  // ** Vars
  const leftSidebarWidth = 260

  //const addEventSidebarWidth = 400

  const { skin, direction } = settings
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  //   const addEvent = () => {}

  //   const fetchEvents = () => {}

  //   const deleteEvent = () => {}

  const updateEvent = (data: any) => {
    console.log(data)
  }

  const handleSelectEvent = (data: any) => {
    console.log(data)
  }

  const handleAllCalendars = (data: any) => {
    console.log(data)
  }
  const handleCalendarsUpdate = (data: any) => {
    const updatedSelectedCalendars = selectedCalendars.includes(data)
      ? selectedCalendars.filter(cal => cal !== data)
      : [...selectedCalendars, data]

    setSelectedCalendars(updatedSelectedCalendars)

    const filteredEvents = filterEvent
      ? filterEvent.filter(ev => updatedSelectedCalendars.includes(ev.extendedProps.calendar))
      : []

    setEvent(filteredEvents)
  }

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
