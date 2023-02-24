// ** MUI Imports
import { styled, Typography } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

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

const CustomBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.customColors.myDayBg,
  padding: '8px',
  borderLeft: '3px solid #EF2B58'
}))

const MyDays = () => {
  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6' color={'primary'}>
          MY DAY
        </Typography>
        <Typography variant='caption' fontWeight={600}>
          Thursday, 17th February, 2023
        </Typography>
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
