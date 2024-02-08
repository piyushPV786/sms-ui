import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  FadeProps,
  Grid,
  Typography,
  DialogActions,
  Button,
  Box
} from '@mui/material'
import React, { ReactElement, Ref, forwardRef, useState } from 'react'
import Chip from 'src/@core/components/mui/chip'
import DashboardCustomHooks from '../dashboard/CustomHooks'
import { ICourseDetails } from 'src/context/common'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface CoreDataByYear {
  [key: string]: ICourseDetails[]
}

const ElectiveModule = () => {
  const [dialogShow, setDialogShow] = useState<boolean>(false)

  const { rollover, electiveModule } = DashboardCustomHooks()

  console.log('electiveModule', electiveModule)

  const electiveDataByYear: CoreDataByYear = {}
  electiveModule?.forEach((module: ICourseDetails) => {
    const yearKey = `${module?.course?.academicYearOfProgram}stYear`
    if (!electiveDataByYear[yearKey]) {
      electiveDataByYear[yearKey] = []
    }
    electiveDataByYear[yearKey].push(module)
  })

  const Year = (academicYear: number) => {
    return `${academicYear}st year`
  }

  console.log('electiveDataByYear', electiveDataByYear)

  const handleOpen = () => {
    setDialogShow(true)
  }
  const handleClose = () => {
    setDialogShow(false)
  }
  const PassedModulesByYear: [] = []

  rollover?.passedModules?.reduce((acc: any, data: { academicYearOfProgram: number }) => {
    const year = data?.academicYearOfProgram
    acc[year - 1] = acc[year - 1] || []
    acc[year - 1].push(data)

    return acc
  }, PassedModulesByYear)

  return (
    <Grid>
      <Box onClick={handleOpen}>
        <Typography variant='caption' color='primary' sx={{ textDecoration: 'underline' }}>
          Enrolled Modules
        </Typography>
      </Box>

      <Dialog
        open={dialogShow}
        maxWidth='sm'
        fullWidth
        scroll='body'
        onClose={(event, reason) => {
          reason !== 'backdropClick' && setDialogShow(false)
        }}
        TransitionComponent={Transition}
      >
        <DialogTitle
          display='flex'
          justifyContent='center'
          fontWeight='bold'
          color={theme => theme.palette.primary.main}
          bgcolor='#c5e3d9'
        >
          Enrolled Modules
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={6} mt={1} display='flex' justifyContent='center'>
            {Object.keys(electiveDataByYear).length > 0 ? (
              Object?.entries(electiveDataByYear)?.map(([year, modules]) => (
                <Grid item xs={12} key={year}>
                  <Typography fontWeight='bold'>{Year(parseInt(year))} - Elective Modules</Typography>

                  <Grid mt={1}>
                    {modules?.map(module => (
                      <Chip
                        key={module?.course?.name}
                        skin='light'
                        size='small'
                        label={module?.course?.name}
                        color='success'
                        sx={{
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { lineHeight: '18px' },
                          borderRadius: '10px',
                          boxShadow: '2px 4px 4px 0px #9f9f9f75',
                          margin: '4px'
                        }}
                      />
                    ))}
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid item mt={1}>
                <Typography variant='body2'>No Elective Module</Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default ElectiveModule
