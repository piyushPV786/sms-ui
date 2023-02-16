// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

import Spinner from 'src/settings/@core/components/spinner'

const Home = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/dashboard/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home