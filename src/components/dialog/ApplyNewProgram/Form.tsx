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
import { IApplyNewProg } from '.'

const FormContent = ({ programData }: IApplyNewProg) => {
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

  const FilteredProg = program?.filter((i: { code: string }) => !programData?.map(ie => ie?.code)?.includes(i?.code))

  const {
    data: StudyMode,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['studyMode', qualification],
    queryFn: () => getProgramList(qualification),
    enabled: !!qualification
  })
  const StudyModeArray = StudyMode?.length && StudyMode[0]

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
            options={FilteredProg}
            renderInput={params => <TextField {...params} label='Interested Qualification' />}
          />
          <FormHelperText sx={{ color: 'red' }}>
            {!!errors?.qualification && `${errors?.qualification?.message}`}
          </FormHelperText>
        </Grid>
        {qualification && StudyModeArray?.studyModes?.length && (
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
                  setValue('qualificationName', StudyModeArray?.programName)
                  clearErrors('studyMode')
                }}
                name='radio-buttons-group'
              >
                {StudyModeArray?.studyModes?.map(
                  (
                    item: {
                      studyModeCode: string
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
                    <FormControlLabel
                      key={index}
                      value={item.studyModeCode}
                      control={<Radio />}
                      label={item.studyModeCode}
                    />
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
