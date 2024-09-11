import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import Close from 'mdi-material-ui/Close';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import {  AddEventSidebarType } from 'src/types/calendarTypes';

interface PickerProps {
  label?: string;
  error?: boolean;
  registername?: string;
}

interface DefaultStateType {
  url: string;
  title: string;
  allDay: boolean;
  calendar: string;
  description: string;
  endDate: Date | undefined;
  startDate: Date | undefined;
  guests: string[] | string | undefined;
}

const capitalize = (string: string) => string && string[0].toUpperCase() + string.slice(1);

const defaultState: DefaultStateType = {
  url: '',
  title: '',
  guests: [],
  allDay: true,
  description: '',
  endDate: new Date(),
  calendar: 'Business',
  startDate: new Date()
}

const AddEventSidebar = (props: AddEventSidebarType) => {
  const {
    store,
    addEvent,
    updateEvent,
    drawerWidth,
    calendarApi,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle
  } = props;

  const [values, setValues] = useState<DefaultStateType>(defaultState);

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } });

  const handleSidebarClose = async () => {
    setValues(defaultState);
    clearErrors();
    handleSelectEvent(null);
    handleAddEventSidebarToggle();
  };

  const onSubmit = (data: { title: string }) => {
    const modifiedEvent: {
      url: string;
      display: string;
      title: string;
      end: Date | string; // Adjust type here
      allDay: boolean;
      start: Date | string; // Adjust type here
      extendedProps: {
        calendar: string;
        guests: string | string[] | undefined;
        description: string | undefined;
      };
    } = {
      url: values.url,
      display: 'block',
      title: data.title,
      end: values.endDate ? values.endDate.toISOString() : '', // Convert Date to ISO string or set a default value
      allDay: values.allDay,
      start: values.startDate ? values.startDate.toISOString() : '', // Convert Date to ISO string or set a default value
      extendedProps: {
        calendar: capitalize(values.calendar),
        guests: values.guests && values.guests.length ? values.guests : undefined,
        description: values.description.length ? values.description : undefined
      }
    };
  
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      addEvent(modifiedEvent);
    } else {
      updateEvent({ id: store.selectedEvent.id, ...modifiedEvent });
    }
    calendarApi.refetchEvents();
    handleSidebarClose();
  };
  

  const handleDeleteEvent = () => {
    if (store.selectedEvent) {
      deleteEvent(store.selectedEvent.id);
    }
    handleSidebarClose();
  };

  const handleStartDate = (date: Date | null) => {
    if (date) {
      const newDate = new Date(date);
      if (newDate > (values.endDate || new Date())) {
        setValues({ ...values, startDate: newDate, endDate: newDate });
      } else {
        setValues({ ...values, startDate: newDate });
      }
    }
  };

  const resetToStoredValues = useCallback(() => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent;
      setValue('title', event.title || '');
      setValues({
        url: event.url || '',
        title: event.title || '',
        allDay: event.allDay,
        guests: event.extendedProps.guests || [],
        description: event.extendedProps.description || '',
        calendar: event.extendedProps.calendar || 'Business',
        endDate: event.end !== null ? new Date(event.end) : undefined,
        startDate: event.start !== null ? new Date(event.start) : undefined
      });
    }
  }, [setValue, store.selectedEvent]);

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '');
    setValues(defaultState);
  }, [setValue]);

  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues();
    } else {
      resetToEmptyValues();
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent]);

  const PickersComponent = forwardRef(({ ...props }: PickerProps, ref) => {
    return (
      <TextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    );
  });

  const RenderSidebarFooter = () => {
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Update
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToStoredValues}>
            Reset
          </Button>
        </Fragment>
      );
    }
  };

  return (
    <Drawer
      anchor='right'
      open={addEventSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    >
      <Box
        className='sidebar-header'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'background.default',
          p: theme => theme.spacing(3, 3.255, 3, 5.255)
        }}
      >
        <Typography variant='h6'>
          {store.selectedEvent !== null && store.selectedEvent.title.length ? 'Update Event' : 'Add Event'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {store.selectedEvent !== null && store.selectedEvent.title.length ? (
            <DeleteOutline
              fontSize='small'
              sx={{ cursor: 'pointer', mr: store.selectedEvent !== null ? 2 : 0 }}
              onClick={handleDeleteEvent}
            />
          ) : null}
          <Close fontSize='small' onClick={handleSidebarClose} sx={{ cursor: 'pointer' }} />
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(5, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField label='Title' value={value} onChange={onChange} error={Boolean(errors.title)} />
                )}
              />
              {errors.title && (
                <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='event-calendar'>Calendar</InputLabel>
              <Select
                label='Calendar'
                value={values.calendar}
                labelId='event-calendar'
                onChange={e => setValues({ ...values, calendar: e.target.value })}
              >
                <MenuItem value='Personal'>Personal</MenuItem>
                <MenuItem value='Business'>Business</MenuItem>
                <MenuItem value='Family'>Family</MenuItem>
                <MenuItem value='Holiday'>Holiday</MenuItem>
                <MenuItem value='ETC'>ETC</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mb: 6 }}>
              <DatePicker
                selectsStart
                id='event-start-date'
                endDate={values.endDate}
                selected={values.startDate}
                startDate={values.startDate}
                showTimeSelect={!values.allDay}
                dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label='Start Date' registername='startDate' />}
                onChange={(date: Date | null) => {
                  if (date) {
                    setValues({ ...values, startDate: new Date(date) });
                  } else {
                    setValues({ ...values, startDate: undefined });
                  }
                }}
                onSelect={handleStartDate}
              />
            </Box>
            <Box sx={{ mb: 6 }}>
              <DatePicker
                selectsEnd
                id='event-end-date'
                endDate={values.endDate}
                selected={values.endDate}
                minDate={values.startDate}
                startDate={values.startDate}
                showTimeSelect={!values.allDay}
                dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label='End Date' registername='endDate' />}
                onChange={(date: Date | null) => {
                  if (date) {
                    setValues({ ...values, endDate: new Date(date) });
                  } else {
                    setValues({ ...values, endDate: undefined });
                  }
                }}
              />
            </Box>
            <FormControl sx={{ mb: 6 }}>
              <FormControlLabel
                label='All Day'
                control={
                  <Switch checked={values.allDay} onChange={e => setValues({ ...values, allDay: e.target.checked })} />
                }
              />
            </FormControl>
            <TextField
              fullWidth
              type='url'
              id='event-url'
              sx={{ mb: 6 }}
              label='Event URL'
              value={values.url}
              onChange={e => setValues({ ...values, url: e.target.value })}
            />
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='event-guests'>Guests</InputLabel>
              <Select
                multiple
                label='Guests'
                value={values.guests}
                labelId='event-guests'
                id='event-guests-select'
                onChange={e => setValues({ ...values, guests: e.target.value })}
              >
                <MenuItem value='bruce'>Bruce</MenuItem>
                <MenuItem value='clark'>Clark</MenuItem>
                <MenuItem value='diana'>Diana</MenuItem>
                <MenuItem value='john'>John</MenuItem>
                <MenuItem value='barry'>Barry</MenuItem>
              </Select>
            </FormControl>
            <TextField
              rows={4}
              multiline
              fullWidth
              sx={{ mb: 6 }}
              label='Description'
              id='event-description'
              value={values.description}
              onChange={e => setValues({ ...values, description: e.target.value })}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderSidebarFooter />
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </Drawer>
  );
};

export default AddEventSidebar;
