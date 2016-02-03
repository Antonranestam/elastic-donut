import Home from '../components/Home'
import Destination from '../components/Destination'

export const appRoutes = [
  { path: '/', component: Home, as: 'Home' },
  { path: '/destination', component: Destination, as: 'Destination' }
]
