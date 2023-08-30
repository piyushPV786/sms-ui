import { Box, Card, Grid } from '@mui/material'
import { ProfileInfo } from '.'

interface IProps {
  userProfileDetails: any
  qualificationData: any
}

const EmploymentInformation = ({ userProfileDetails, qualificationData }: IProps) => {
  console.log('userProfileDetailsSponsor ===================>', qualificationData)

  return (
    <Box>
      {!!userProfileDetails && userProfileDetails?.employment && (
        <Grid container xs={12} sx={{ marginTop: 10 }}>
          <ProfileInfo label='Employment Status' info={`${userProfileDetails?.employment?.employmentStatusCode}`} />
          <ProfileInfo label='Employer' info={`${userProfileDetails?.employment?.employer}`} />
          <ProfileInfo label='Job Title' info={`${userProfileDetails?.employment?.jobTitle}`} />
          <ProfileInfo label='Industry' info={`${userProfileDetails?.employment?.employmentIndustryCode}`} />
          <ProfileInfo label='Manager Name' info={`${userProfileDetails?.employment?.managerName}`} />
        </Grid>
      )}

      <Grid container xs={12} display={'flex'} justifyContent={'space-between'}>
        <Grid sm={5} xs={12} item>
          OFFICE ADDRESS
          <Card sx={{ height: 130, padding: 7, marginTop: 1, position: 'relative' }}>
            {`${userProfileDetails?.employment?.officeAddress}`}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EmploymentInformation
