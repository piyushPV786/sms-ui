// ** React Import
import { useEffect, useRef, useState } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'

// ** Types
import { CalendarType } from 'src/types/calendarTypes'
import FallbackSpinner from 'src/@core/components/spinner'

const blankEvent = {
  title: '',
  start: '',
  end: '',
  allDay: false,
  url: '',
  extendedProps: {
    calendar: '',
    guests: [],
    location: '',
    description: ''
  }
}

const Calendar = (props: CalendarType) => {
  // ** Props
  const {
    store,
    direction,
    updateEvent,
    calendarApi,
    calendarsColor,
    setCalendarApi,
    handleSelectEvent,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle
  } = props

  const calendarRef = useRef(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore

      setCalendarApi(calendarRef?.current?.getApi())
    }
  }, [calendarApi, setCalendarApi])

  useEffect(() => {
    // Set loading to false once events are ready
    if (store?.events) {
      setIsLoading(false)
    }
  }, [store?.events])

  if (store) {
    // ** calendarOptions(Props)
    const calendarOptions = {
      // initialEvents: store.events, // Use initialEvents for initial rendering
      events: store?.events || [],
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        start: 'sidebarToggle, prev, next, title,customButton',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },

      /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
      editable: true,

      /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
      eventResizableFromStart: true,

      /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
      dragScroll: true,

      /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
      dayMaxEvents: 2,

      /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
      navLinks: true,

      eventClassNames({ event: calendarEvent }: any) {
        // @ts-ignore
        const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

        return [
          // Background Color
          `bg-${colorName}`
        ]
      },

      eventClick({ event: clickedEvent }: any) {
        handleSelectEvent(clickedEvent)
        handleAddEventSidebarToggle()

        // * Only grab required field otherwise it goes in infinity loop
        // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
        // event.value = grabEventDataFromEventApi(clickedEvent)

        // isAddNewEventSidebarActive.value = true
      },

      customButtons: {
        customButtons: {
          sidebarToggle: {
            text: <Menu />,
            click() {
              handleLeftSidebarToggle()
            }
          }
        }
      },

      dateClick(info: any) {
        const ev = { ...blankEvent }
        ev.start = info.date
        ev.end = info.date
        ev.allDay = true

        // @ts-ignore
        handleSelectEvent(ev)
        handleAddEventSidebarToggle()
      },

      /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
      eventDrop({ event: droppedEvent }: any) {
        updateEvent(droppedEvent)
      },

      /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
      eventResize({ event: resizedEvent }: any) {
        updateEvent(resizedEvent)
      },

      ref: calendarRef,

      // Get direction from app state (store)
      direction
    }

    if (isLoading) {
      return <FallbackSpinner /> // Show a loading spinner or message
    }

    // @ts-ignore
    return store?.events ? <FullCalendar {...calendarOptions} /> : null
  } else {
    return null
  }
}

export default Calendar
