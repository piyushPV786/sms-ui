// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@materialize.com'
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  // ** Hooks
  const auth = useAuth()

  // ** Vars

  const { setError } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    auth.login({ email, password }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  return (
    <Box className='content-center'>
      <Button
        fullWidth
        size='large'
        variant='contained'
        sx={{ mb: 7, mt: 3 }}
        onClick={() => onSubmit({ email: 'admin@materialize.com', password: 'admin' })}
      >
        Login
      </Button>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
