import React, { useContext } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { LoginContext } from './context/LoginContext'
import Customer from './pages/Customer'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import AddCustomer from './components/AddCustomer'

const App = () => {
  const{token}=useContext(LoginContext);
  const PrivateRouteWraper=({auth:{isAuthenticated}})=>{
    return isAuthenticated?<Outlet/>:<Navigate to={"/"}/>;
  }
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route element={<PrivateRouteWraper auth={token==null?{isAuthenticated:false}:{isAuthenticated:true}}/>}>
        <Route path='/customer' element={<Customer/>}/>
        <Route path='/add' element={<AddCustomer/>}/>
      </Route>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}

export default App