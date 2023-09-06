import { LogoutOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import TableData from '../components/TableData'

const Customer = () => {
  const{handleSetToken}=useContext(LoginContext);

  const handleLogout=()=>{
    localStorage.removeItem("token");
    handleSetToken(null);
  }

  return (
    <div style={{margin:"10px"}}>
        <div className='heading'>
          <div><Link to={"/add"}><Button type='primary' icon={<UserAddOutlined />}>Add Customer</Button></Link></div>
          <div className='title1'><h1 style={{color:"teal"}}>Customer List</h1></div>
          <div><Button onClick={handleLogout} type='primary' icon={<LogoutOutlined />} danger>Logout</Button></div>
        </div>
        <div className='title2'><h1 style={{color:"teal"}}>Customer List</h1></div>
        <TableData/>
    </div>
  )
}

export default Customer