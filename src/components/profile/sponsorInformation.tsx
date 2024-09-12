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
      {!!userProfileDetails && userProfileDetails?.sponsor?.length && (
        <>
          {userProfileDetails?.sponsor?.map((userProfileDetails: any, index: number) => {
            return (
              <Card sx={{ padding: 3, marginTop: 3 }} key={index}>
                <Grid container xs={12}>
                  <ProfileInfo label='Sponsor Type' info={`${userProfileDetails?.sponsorModeCode}`} />
                  <ProfileInfo label='Relationship Type' info={`${userProfileDetails?.relationshipCode}`} />
                  <ProfileInfo
                    label='Guardian Name'
                    info={`${userProfileDetails?.firstName} ${userProfileDetails?.lastName}`}
                  />
                  <ProfileInfo label='Guardian Email Address' info={`${userProfileDetails?.email}`} />
                  <ProfileInfo label='Guardian Phone Number' info={`${userProfileDetails?.mobileNumber}`} />
                </Grid>
                <Grid container xs={12} display={'flex'} justifyContent={'space-between'}>
                  <Grid sm={5} xs={12} item>
                    GUARDIAN ADDRESS
                    <Card sx={{ height: 130, padding: 7, marginTop: 1, position: 'relative' }}>
                      {`${userProfileDetails?.address}`}, {userProfileDetails?.city},{state},{' '}
                      {getName(country, userProfileDetails?.country)},{userProfileDetails?.zipCode}
                    </Card>
                  </Grid>
                </Grid>
              </Card>
            )
          })}
        </>
      )}
    </Box>
  )
}

export default SponsorInformation
