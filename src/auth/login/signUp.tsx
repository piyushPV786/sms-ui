import { Button, Grid, TextField, Typography } from '@material-ui/core'

interface ISignUpProps {
  onSubmit: any
  setIsForgotPassword: any
}

const SignUp = ({ onSubmit, setIsForgotPassword }: ISignUpProps) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <TextField label='Email' variant='outlined' fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label='Password' variant='outlined' fullWidth />
      </Grid>
      <Grid container justifyContent='center' xs={12}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => onSubmit({ email: 'admin@materialize.com', password: 'admin' })}
        >
          Sign In
        </Button>
      </Grid>
      <Grid container justifyContent='center' xs={12}>
        <div style={{ cursor: 'pointer', marginTop: '10px' }} onClick={() => setIsForgotPassword(true)}>
          <Typography color='primary' variant='subtitle1'>
            Forgot Password ?
          </Typography>
        </div>
      </Grid>
    </Grid>
  )
}

export default SignUp
