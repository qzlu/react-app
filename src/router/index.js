import Loadable from 'react-loadable';
/* import Index from '@/pages/home/index.jsx'
import IndexItem from '@/pages/home/indexItem.jsx' */
import Login from '@/pages/Login/login'
const loading = () => `<div>loading</div>`
const routes = [
  {
    path:'/Login',
    component:Login
  },
  {
    path:'',
    component:Loadable({loader:() => import('@/pages/home/home.jsx'),loading:loading})
  },
]
export default routes