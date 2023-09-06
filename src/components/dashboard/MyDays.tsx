// ** MUI Imports
import { Grid, styled, Typography } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { FilePowerpoint } from 'mdi-material-ui'
import { ISchedule } from 'src/context/common'
import { DateFormat, DDMMYYYDateFormat } from 'src/utils'

interface DataType {
  name: string
  program: string
  date: string
  time: string
  imgSrc: string
}

const data: DataType[] = [
  {
    name: 'Cara Stevens',
    program: 'Mathematics',
    date: 'Today',
    time: '09:00-10:00',
    imgSrc: '/student/images/avatars/1.png'
  },
  {
    name: 'Airi Satou',
    program: 'Computer Science',
    date: 'Today',
    time: '09:00-10:00',
    imgSrc: '/student/images/avatars/1.png'
  },
  {
    name: 'Jens Brincker',
    program: 'Geography',
    date: 'Today',
    time: '09:00-10:00',
    imgSrc: '/student/images/avatars/1.png'
  },
  {
    name: 'Mohan Lal lovewanshi',
    program: 'Project Management',
    date: 'Today',
    time: '09:00-10:00',
    imgSrc: '/student/images/avatars/1.png'
  }
]

const CustomBox1 = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  borderBottom: '1px solid #c7c5c5'
}))
const CustomBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.customColors.myDayBg,
  padding: '8px',
  borderLeft: '3px solid #EF2B58'
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
        <Box mt={6}>
          {data.map((item: DataType, index: number) => {
            return (
              <CustomBox
                key={item.name}
                sx={{
                  mb: index !== data.length - 1 ? 5.75 : undefined
                }}
              >
                <img width={34} height={34} alt={'profile image'} src={item.imgSrc} />
                <Box
                  sx={{ ml: 3, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {item.name}
                    </Typography>
                    <Typography variant='caption'>{item.program}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {item.date}
                      </Typography>
                      <Typography variant='caption'>{item.time}</Typography>
                    </Typography>
                  </Box>
                </Box>
              </CustomBox>
            )
          })}
        </Box>
      </CardContent>
    </Card>
  )
}

export default MyDays
