import { Box, Grid } from '@mui/material'
import { ProfileInfo } from '.'

interface IProps {
  userProfileDetails: any
  qualificationData: any
}

const KinInformation = ({ userProfileDetails }: IProps) => {
  return (
    <Box>
      {!!userProfileDetails && userProfileDetails?.kin && (
        <Grid container xs={12} sx={{ marginTop: 10 }}>
          <ProfileInfo label='Kin Name' info={`${userProfileDetails?.kin?.fullName}`} />
          <ProfileInfo label='Relationship' info={`${userProfileDetails?.kin?.relationship}`} />
          <ProfileInfo label='Kin Email Address' info={`${userProfileDetails?.kin?.email}`} />
          <ProfileInfo label='Kin Mobile Number' info={`${userProfileDetails?.kin?.mobileNumber}`} />
        </Grid>
      )}
    </Box>
  )
}

export default KinInformation
