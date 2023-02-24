import { Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import Box, { BoxProps } from '@mui/material/Box'

const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(3)} !important`,
  borderTop: '8px solid #EF2B58',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '0 !important'
  },
   backgroundColor: theme.palette.customColors.myDayBg,
}))
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
  padding: '8px',
   backgroundColor: theme.palette.customColors.myClassesBg,
}))
const Classes = () => {
  return (
    <Card sx={{ position: 'relative', borderRadius: '0px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' mb={5} color={'primary'}>
            MY CLASSES
          </Typography>
          <Box>
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
          
        </Box>
      </CardContent>
    </Card>
  )
}

export default Classes
