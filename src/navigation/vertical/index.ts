// ** Icon imports
import { HomeOutline, SchoolOutline, CreditCard, HelpBox } from 'mdi-material-ui'

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
      title: 'Academic Transcript',
      icon: SchoolOutline,
      path: '/academic-transcript',
      badgeColor: 'error'
    },
    {
      title: 'Calendar',
      icon: SchoolOutline,
      path: '/calendar',
      badgeColor: 'error'
    },
    {
      title: 'My Attendance',
      icon: CreditCard,
      path: '/attendance'
    },
    {
      title: 'My Queries',
      icon: HelpBox,
      path: '/query'
    }
  ]
}

export default navigation
