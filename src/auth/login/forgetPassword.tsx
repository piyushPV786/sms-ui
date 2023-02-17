import { Box, Grid, Typography } from '@material-ui/core'

interface IForgetPasswordProps {
  setIsForgotPassword: any
}

const ForgetPassword = ({ setIsForgotPassword }: IForgetPasswordProps) => {
  return (
    <div>
      Forget Password
      <Grid container justifyContent='center' xs={12}>
        <Box onClick={() => setIsForgotPassword(false)}>
          <Typography variant='subtitle1' color='primary'>
            Back to login
          </Typography>
        </Box>
      </Grid>
    </div>
  )
}

export default ForgetPassword
