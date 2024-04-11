import { Box, LinearProgress, LinearProgressProps, Typography } from '@mui/material'
import toast from 'react-hot-toast'

export const successToast = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    style: { borderRadius: '10px', background: '#1f2b37', color: '#fff' }
  })
}
export const errorToast = (message: string) => {
  toast.error(message, {
    position: 'top-center',
    style: { borderRadius: '10px', background: '#1f2b37', color: '#fff' }
  })
}

export const successToastBottomRight = (message: string) => {
  toast.success(message, {
    position: 'bottom-right',
    style: { borderRadius: '10px', background: '#1f2b37', color: '#fff' }
  })
}

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} color='success' />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.primary'>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}
