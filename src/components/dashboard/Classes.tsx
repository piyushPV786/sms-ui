import { Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import Box, { BoxProps } from '@mui/material/Box'
import { getName } from 'src/utils'

const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(3)} !important`,
  borderTop: '8px solid #EF2B58',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '0 !important'
  },
  backgroundColor: theme.palette.customColors.myDayBg
}))
interface DataType {
  courseCode: string
  programCode: string
  facilitator: string
  name: string
  program: string
  date: string
  time: string
  imgSrc: string
}

const CustomBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  backgroundColor: theme.palette.customColors.myClassesBg
}))

const Classes = ({ classes, invigilator, programList, courseList }: any) => {
  return (
    <Card sx={{ position: 'relative', borderRadius: '0px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', pb: 10 }}>
          <Typography variant='h6' mb={5} color={'primary'}>
            MY CLASSES
          </Typography>
          <Box>
            {classes?.classManagementData?.map((item: DataType, index: number) => {
              return (
                <CustomBox
                  key={item.name}
                  sx={{
                    mb: index !== classes.length - 1 ? 5.75 : undefined
                  }}
                >
                  <Box
                    sx={{
                      ml: 3,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {getName(invigilator, item.facilitator)}
                      </Typography>
                      <Typography variant='caption'>{getName(programList, item.programCode)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {getName(courseList, item.courseCode)}
                        </Typography>
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
