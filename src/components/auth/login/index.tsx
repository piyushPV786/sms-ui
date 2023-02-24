import { Button, Grid, TextField, Typography } from '@mui/material'

interface FormData {
  email: string
  password: string
}
interface ISignUpProps {
  onSubmit: (arg0: FormData) => void
}

const SignUp = ({ onSubmit }: ISignUpProps) => {
  return (
    <Grid container rowSpacing={10}>
      <Grid item xs={12}>
        <TextField label='Email' variant='outlined' fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label='Password' variant='outlined' fullWidth />
      </Grid>
      <Grid item justifyContent='center' xs={12} sx={{ display: 'flex' }}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => onSubmit({ email: 'admin@materialize.com', password: 'admin' })}
        >
          Sign In
        </Button>
      </Grid>
      <Grid container justifyContent='center' xs={12}>
        <div style={{ cursor: 'pointer', marginTop: '10px' }}>
          <Typography color='primary' variant='subtitle1'>
            Forgot Password ?
          </Typography>
        </div>
      </Grid>
    </Grid>
  )
}

export default SignUp
