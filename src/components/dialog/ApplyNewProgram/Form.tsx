import {
  Backdrop,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import ControlledAutocomplete from 'src/components/ControlledAutocomplete'
import { getAllPrograms, getProgramList } from './APIHook'
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect } from 'react'

const FormContent = () => {
  const {
    control,
    register,
    watch,
    clearErrors,
    setValue,
    formState: { errors }
  } = useFormContext()
  const { data: program, isLoading: loading } = useQuery({
    queryKey: ['program'],
    queryFn: getAllPrograms,
    refetchOnWindowFocus: false
  })
  const qualification = watch('qualification')

  const {
    data: StudyMode,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['studyMode', qualification],
    queryFn: () => getProgramList(qualification),
    enabled: !!qualification
  })

  useEffect(() => {
    if (qualification) {
      refetch()
    }
  }, [qualification, refetch])

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading || loading}>
        <CircularProgress color='primary' />
      </Backdrop>
      <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6} sm={12} md={12}>
          <ControlledAutocomplete
            control={control}
            name='qualification'
            options={program}
            renderInput={params => <TextField {...params} label='Interested Qualification' />}
          />
          <FormHelperText sx={{ color: 'red' }}>
            {!!errors?.qualification && `${errors?.qualification?.message}`}
          </FormHelperText>
        </Grid>
        {qualification && StudyMode?.studyModeCodes?.length && (
          <Grid item xs={6} sm={12} md={12}>
            <FormControl size='small'>
              <FormLabel>Study Mode</FormLabel>
              <RadioGroup
                {...register('studyMode')}
                id='studyMode'
                row
                value={watch('studyMode')}
                onChange={e => {
                  setValue('studyMode', e.target.value)
                  setValue('qualificationName', StudyMode?.name)
                  clearErrors('studyMode')
                }}
                name='radio-buttons-group'
              >
                {StudyMode?.studyModeCodes?.map(
                  (
                    item: {
                      code: unknown
                      name:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | ReactFragment
                        | ReactPortal
                        | null
                        | undefined
                    },
                    index: Key | null | undefined
                  ) => (
                    <FormControlLabel key={index} value={item.code} control={<Radio />} label={item.name} />
                  )
                )}
              </RadioGroup>
              <FormHelperText sx={{ color: 'red' }}>
                {!!errors.studyMode && `${errors.studyMode?.message}`}
              </FormHelperText>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </>
  )
}
export default FormContent
