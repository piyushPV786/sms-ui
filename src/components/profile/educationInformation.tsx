import { Box, Grid } from '@mui/material'

interface IProps {
  userProfileDetails: any
}

const EducationInformation = ({ userProfileDetails }: IProps) => {
  console.log('userProfileDetails ===================>', userProfileDetails)

  return <Box>{!!userProfileDetails && <Grid container xs={12} sx={{ marginTop: 10 }}></Grid>}</Box>
}

export default EducationInformation
