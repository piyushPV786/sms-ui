import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material'
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage, PathTypes } from 'src/context/common'
import { useAuth } from 'src/hooks/useAuth'
import * as yup from 'yup'

const schema = yup.object().shape({
  userName: yup.string().required(ErrorMessage.userNameRequired),
  password: yup.string().min(5).required()
})

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const auth = useAuth()
  const onSubmit = (data: any) => {
    const { userName, password } = data
    auth.login({ username: userName, password }, () => {
      setError('userName', {
        type: 'manual',
        message: 'User Name or Password is invalid'
      })
    })
  }

  const router = useRouter()
  const onClickHandle = () => {
    router.replace(PathTypes.resetlink)
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={8}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name='userName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onBlur } }) => (
                <TextField
                  autoFocus
                  label='User Name'
                  value={value}
                  onBlur={onBlur}
                  onChange={e => {
                    const trimmedValue = e.target.value.trim()
                    setValue('userName', trimmedValue)
                  }}
                  error={Boolean(errors?.userName)}
                />
              )}
            />
            {errors?.userName && (
              <FormHelperText sx={{ color: 'error.main' }}>{`${errors?.userName?.message}`}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              Password
            </InputLabel>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  onBlur={onBlur}
                  label='Password'
                  onChange={onChange}
                  id='auth-login-v2-password'
                  error={Boolean(errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors?.password && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {`${errors?.password?.message}`}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item justifyContent='center' xs={12} sx={{ display: 'flex' }}>
          <Button color='primary' variant='contained' type='submit'>
            Sign In
          </Button>
        </Grid>
        <Grid container justifyContent='center' xs={12}>
          <div role='button' style={{ cursor: 'pointer', marginTop: '10px' }} onClick={onClickHandle}>
            <Typography color='primary' variant='subtitle1'>
              Forgot Password ?
            </Typography>
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default SignUp
