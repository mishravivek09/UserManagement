import { Button, Form, Input, message } from 'antd'
import React, { useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'

const Home = () => {

  const{handleSetToken}=useContext(LoginContext);
  const navigate=useNavigate();
  const handleLogin=async(data)=>{

    data=JSON.stringify(data);
    
    const req=await fetch("https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp",{
      method:"POST",
      body:data,
      headers:{
        "content-type":"application/json"
      }
    });

    try {
      const res=await req.json();
      if(req.status==200){
        
        handleSetToken(res);
        localStorage.setItem("token",JSON.stringify(res));
        message.success({content:"Login successfully!"});
        navigate("/customer");
      }else{
        message.error({content:"Too many requests"});
      }
    } catch (error) {
      message.error({content:"Invalid username or password!"});
      console.log(error);
    }
  }
  return (
    <div className='form'>
      <Form onFinish={handleLogin}>

        <h1 style={{color:"teal"}}>Login</h1>

        <Form.Item label="Username"
        name="login_id"
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          },
        ]}>
          <Input placeholder='login_id'/>
        </Form.Item>

        <Form.Item label="Password" name="password" 
        rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
        ]}>
          <Input.Password placeholder='password'/>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Home