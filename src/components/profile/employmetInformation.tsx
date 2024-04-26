import { Box, Card, Grid } from '@mui/material'
import { ProfileInfo } from '.'
import UseCustomHook from '../common/CustomHook'
import { getName } from 'src/utils'

interface IProps {
  userProfileDetails: any
  qualificationData: any
  state: string
}

const EmploymentInformation = ({ userProfileDetails, state }: IProps) => {
  const { industry, country } = UseCustomHook()

  return (
    <Box>
      {!!userProfileDetails && userProfileDetails?.employment && (
        <Grid container xs={12} sx={{ marginTop: 10 }}>
          <ProfileInfo
            label='Employment Status'
            info={`${
              userProfileDetails?.employment?.employmentStatusCode
                ? userProfileDetails?.employment?.employmentStatusCode
                : '-'
            }`}
          />
          <ProfileInfo
            label='Employer'
            info={`${userProfileDetails?.employment?.employer ? userProfileDetails?.employment?.employer : '-'}`}
          />
          <ProfileInfo
            label='Job Title'
            info={`${userProfileDetails?.employment?.jobTitle ? userProfileDetails?.employment?.jobTitle : '-'}`}
          />
          <ProfileInfo
            label='Industry'
            info={`${
              userProfileDetails?.employment?.employmentIndustryCode
                ? getName(industry, userProfileDetails?.employment?.employmentIndustryCode)
                : '-'
            }`}
          />
          <ProfileInfo
            label='Manager Name'
            info={`${userProfileDetails?.employment?.managerName ? userProfileDetails?.employment?.managerName : '-'}`}
          />
        </Grid>
      )}
      {userProfileDetails?.employment?.country && (
        <Grid container xs={12} display={'flex'} justifyContent={'space-between'}>
          <Grid sm={5} xs={12} item>
            OFFICE ADDRESS
            <Card sx={{ height: 130, padding: 7, marginTop: 1, position: 'relative' }}>
              {`${userProfileDetails?.employment?.city},${state},
            ${getName(country, userProfileDetails?.employment?.country)},${
                userProfileDetails?.employment?.zipCode ?? '-'
              }`}
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default EmploymentInformation
