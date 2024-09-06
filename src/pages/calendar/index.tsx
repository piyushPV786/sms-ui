// ** React Imports
import { useMemo, useState } from 'react'

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
import { Backdrop, CircularProgress } from '@mui/material'
import { StudentService } from 'src/service'
import { useAuth } from 'src/hooks/useAuth'

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
    fromTime: string
    toTime: string
    date: string
  }

  const auth = useAuth()

  // ** States

  const [calendarApi, setCalendarApi] = useState<null | any>(['Assessments'])
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [event, setEvent] = useState<EventType[] | undefined>([])
  const [filterEvent, setFilterEvent] = useState<EventType[] | undefined>([])
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)
  const [scheduler, setScheduler] = useState<any>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const currentDate: moment.Moment = moment()
  const startDate: moment.Moment = currentDate.clone().startOf('year')
  const endDate: moment.Moment = currentDate.clone().endOf('year')
  const startDateString: string = startDate.format('DD-MM-YYYY')
  const endDateString: string = endDate.format('DD-MM-YYYY')

  // const { scheduler, isLoading } = DashboardCustomHooks()
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
            allDay: true,
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
            allDay: true,

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
            allDay: true,
            extendedProps: {
              calendar: 'Assessments'
            }
          })

        item?.scheduleDuration?.map(item => {
          const date = item?.date
          const FromDate = moment(date)
            .set({
              hour: Number(item?.fromTime?.split(':')[0]),
              minute: Number(item?.fromTime?.split(':')[1]),
              second: Number(item?.fromTime?.split(':')[2])
            })
            .format()
          const ToDate = moment(date)
            .set({
              hour: Number(item?.toTime?.split(':')[0]),
              minute: Number(item?.toTime?.split(':')[1]),
              second: Number(item?.toTime?.split(':')[2])
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

  const getStudentScheduler = async () => {
    setLoading(true)
    if (auth?.user?.studentCode) {
      const startDate = startDateString
      const endDate = endDateString
      const schedulerResponse = await StudentService?.studentScheduler(auth?.user?.studentCode, startDate, endDate)
      setScheduler(schedulerResponse?.data?.data)
    }
    setLoading(false)
  }

  useMemo(() => {
    getStudentScheduler()
  }, [])

  useMemo(() => {
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
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='primary' />
      </Backdrop>
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
