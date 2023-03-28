// ** Icon imports
import { HomeOutline, SchoolOutline, CreditCard } from 'mdi-material-ui'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard',
      badgeColor: 'error'
    },
    {
      title: ' Fee Payment',
      icon: CreditCard,
      path: '/payment'
    },
    {
      title: 'Academic Records',
      icon: SchoolOutline,
      path: '/academic-record',
      badgeColor: 'error'
    }
  ]
}

export default navigation
