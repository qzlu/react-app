import Loadable from 'react-loadable';
import Index from '@/pages/home/index.jsx'
import Login from '@/pages/Login/login'
const loading = () => `<div>loading</div>`
const routes = [
  {
    path:'/Login',
    component:Login
  },
  {
    path:'/',
    component:Loadable({loader:() => import('@/pages/home/index.jsx'),loading:loading})
  }
]
export default routes