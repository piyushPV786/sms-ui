// ** Icon imports
import { HomeOutline } from 'mdi-material-ui'

// ** Type import
import { VerticalNavItemsType } from 'src/settings/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard',
      badgeColor: 'error'
    }
  ]
}

export default navigation
