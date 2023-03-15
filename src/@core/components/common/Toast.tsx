import toast from 'react-hot-toast'

export const successToast = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    style: {
      borderRadius: '10px',
      background: '#1f2b37',
      color: '#fff'
    }
  })
}

export const errorToast = (message: string) => {
  toast.error(message, {
    position: 'top-center',
    style: {
      borderRadius: '10px',
      background: '#1f2b37',
      color: '#fff'
    }
  })
}
