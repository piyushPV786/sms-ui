// ** MUI Imports
import { Grid, styled, Typography } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { FilePowerpoint } from 'mdi-material-ui'
import { ISchedule } from 'src/context/common'
import { DateFormat, DDMMYYYDateFormat } from 'src/utils'

const CustomBox1 = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  borderBottom: '1px solid #c7c5c5'
}))

interface IMyDayProps {
  dayData: ISchedule[]
}

const MyDays = ({ dayData }: IMyDayProps) => {
  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6' color={'primary'}>
          MY DAY
        </Typography>
        <Typography variant='body2' fontWeight={600}>
          {DateFormat(new Date())}
        </Typography>
        {dayData?.length > 0 ? (
          dayData?.map((item: ISchedule) => (
            <CustomBox1 key={item?.course?.id}>
              <Grid container display='flex'>
                <Grid item xs={2} sx={{ p: 1 }}>
                  <Box sx={{ backgroundColor: '#fadede', p: 2, borderRadius: '3px 3px' }}>
                    <FilePowerpoint color='error' />
                  </Box>
                </Grid>
                <Grid item xs={10} sx={{ pl: 2 }}>
                  <Typography variant='body2' color={'primary'} sx={{ mb: 0.5, fontWeight: 600 }}>
                    {item?.course?.name}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <label>Due Date</label>
                    <Typography variant='body2' sx={{ pl: 2, fontWeight: 600 }}>
                      {DDMMYYYDateFormat(item?.individualAssignmentDueDate)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CustomBox1>
          ))
        ) : (
          <Typography variant='caption' sx={{ pl: 2, fontWeight: 400 }}>
            No Assignments for today
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default MyDays
