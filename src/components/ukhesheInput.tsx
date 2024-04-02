import { useRouter } from 'next/router'
import { errorToast } from './common'

const UkhesheInput = ({ value, setOpenPopup, paymentStatusCheck }: any) => {
  const router = useRouter()
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const allowPayment = await paymentStatusCheck()
    if (allowPayment) {
      setOpenPopup(true)
    } else {
      errorToast('Invalid Payment Processing')
      router.push('/dashboard')
    }
  }

  return (
    <>
      <form method='post' id={value} onSubmit={handleSubmit}></form>
    </>
  )
}

export default UkhesheInput
