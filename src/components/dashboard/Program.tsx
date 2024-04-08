import { Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'
import { Box } from '@mui/system'
import { ICommonData, ISchedule, IScheduleData } from 'src/context/common'
import ElectiveModule from '../dialog/ElectiveModule'
import ApplyNewProgram from 'src/components/dialog/ApplyNewProgram'
import { useQueryClient } from '@tanstack/react-query'
import { applicationStatus } from '../common/Constants'

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

  const queryClient = useQueryClient()
  const leadCode = window.sessionStorage.getItem('leadCode')

  const applicationDetails: any[] | undefined = queryClient.getQueryData(['applicationData', leadCode])

  const isGraduate =
    applicationDetails?.length && applicationDetails?.every(i => i.status === applicationStatus.graducated)

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
          <Box>
            <ElectiveModule />
            {isGraduate ? <ApplyNewProgram programData={programData} /> : null}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Program
