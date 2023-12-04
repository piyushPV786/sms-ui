import { Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import { Box } from '@mui/system'
import { ICommonData, ISchedule, IScheduleData } from 'src/context/common'

const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(3)} !important`,
  borderTop: '8px solid #6151FB',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '0 !important'
  }
}))

const Program = ({ scheduler }: any) => {
  const programData =
    scheduler &&
    scheduler?.map((data: IScheduleData) => data?.courseSchedule?.find((i: ISchedule) => i)?.programSchedule?.program)

  return (
    <Card sx={{ position: 'relative', borderRadius: '0px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' mb={5} color={'primary'}>
            My Qualification
          </Typography>
          {programData?.length > 0 &&
            programData?.map((program: ICommonData) => (
              <Box key={program?.id}>
                <Typography variant='body2'>Current Qualification</Typography>
                <Typography
                  variant='caption'
                  sx={{ mb: 5, fontWeight: 600, color: 'text.primary' }}
                >{`${program?.name}(${program?.code})`}</Typography>
              </Box>
            ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Program
