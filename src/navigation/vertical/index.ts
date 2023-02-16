// ** Icon imports
import { CreditCardOutline, HomeOutline, AccountBox } from 'mdi-material-ui'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/student/dashboard',
      badgeColor: 'error'
    }
  ]
}

export default navigation
