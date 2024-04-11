import { useRouter } from 'next/router'
import { errorToast } from 'src/components/common'

const UkhesheInput = ({ value, setOpenPopup, paymentStatusCheck }: any) => {
  const router = useRouter()
  const handleSubmit = async (e: any) => {
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
