import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Orders } from '../pages/Orders'
import { Signup } from '../pages/Signup'
import { PrivateRoute } from './PrivateRoute'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/orders' element={<PrivateRoute><Orders/></PrivateRoute>}></Route>
    </Routes>
  )
}
