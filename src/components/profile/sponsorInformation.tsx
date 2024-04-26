import { Box, Card, Grid } from '@mui/material'
import { ProfileInfo } from '.'
import { getName } from 'src/utils'
import UseCustomHook from '../common/CustomHook'

interface IProps {
  userProfileDetails: any
  qualificationData: any
  state: string
}

const SponsorInformation = ({ userProfileDetails, state }: IProps) => {
  const { country } = UseCustomHook()

  return (
    <Box>
      {!!userProfileDetails && userProfileDetails?.sponsor && (
        <>
          <Grid container xs={12} sx={{ marginTop: 10 }}>
            <ProfileInfo label='Sponsor Type' info={`${userProfileDetails?.sponsor?.sponsorModeCode}`} />
            <ProfileInfo label='Relationship Type' info={`${userProfileDetails?.sponsor?.relationshipCode}`} />
            <ProfileInfo label='Guardian Name' info={`${userProfileDetails?.sponsor?.name}`} />
            <ProfileInfo label='Guardian Email Address' info={`${userProfileDetails?.sponsor?.email}`} />
            <ProfileInfo label='Guardian Phone Number' info={`${userProfileDetails?.sponsor?.mobileNumber}`} />
          </Grid>

          <Grid container xs={12} display={'flex'} justifyContent={'space-between'}>
            <Grid sm={5} xs={12} item>
              GUARDIAN ADDRESS
              <Card sx={{ height: 130, padding: 7, marginTop: 1, position: 'relative' }}>
                {`${userProfileDetails?.sponsor?.address}`}, {userProfileDetails?.sponsor?.city},{state},{' '}
                {getName(country, userProfileDetails?.sponsor?.country)},{userProfileDetails?.sponsor?.zipCode}
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}

export default SponsorInformation
