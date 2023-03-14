// ** Icon imports
import { HomeOutline } from 'mdi-material-ui'

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
      icon: HomeOutline,
      path: '/payment'
    },
    {
      title: 'Academic Records',
      icon: HomeOutline,
      path: '/academicRecord',
      badgeColor: 'error'
    }
  ]
}

export default navigation
