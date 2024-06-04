import { BoxProps, Card, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import { Box } from '@mui/system'
import { FilePowerpoint } from 'mdi-material-ui'
import { DDMMYYYDateFormat } from 'src/utils'
import { ISchedule } from 'src/context/common'

const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(3)} !important`,

  borderTop: '8px solid #FFA427',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '0 !important'
  },
  backgroundColor: theme.palette.customColors.myAssignmentBg
}))
const CustomBox = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  borderBottom: '1px solid #c7c5c5'
}))

// const StyledLink = styled('a')(({}) => ({
//   display: 'flex',
//   alignItems: 'center',
//   textDecoration: 'none',
//   fontSize: '14px',
//   alignSelf: 'flex-end',
//   color: '#008554',
//   marginTop: '10px'
// }))

interface IAssignmentProps {
  courseData: ISchedule[]
}

const Assignments = ({ courseData }: IAssignmentProps) => {
  return (
    <Card sx={{ position: 'relative', borderRadius: '0px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', pb: 10 }}>
          <Typography variant='h6' mb={5} color={'primary'}>
            ASSIGNMENTS
          </Typography>
          {courseData?.length > 0 &&
            courseData?.map((item: ISchedule) => (
              <CustomBox key={item?.course?.id}>
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
                      <label>Due Date -</label>
                      <Box sx={{ display: 'grid', justifyContent: 'flex-end' }}>
                        {item?.scheduleDates?.map((date: any) => (
                          <Typography key={date} variant='body2' sx={{ pl: 2, fontWeight: 600 }}>
                            {DDMMYYYDateFormat(date?.individualAssignmentDueDate)}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CustomBox>
            ))}

          {/* <StyledLink href='https://regeniusuat.regenesys.net/login/index.php' target='_blank'>
            <Launch fontSize='inherit' /> More Assignments
          </StyledLink> */}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Assignments
