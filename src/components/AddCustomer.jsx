import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'

const AddCustomer = () => {
  const {token}=useContext(LoginContext);
  const addCustomer=async(data)=>{
    data=JSON.stringify(data);

    const req=await fetch("https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create",{
      method:"POST",
      body:data,
      headers:{
        "content-type":"application/json",
        "Authorization":"Bearer "+token.access_token
      }
    });
    

    try {

      const res=await req.text();

      if(req.status==201){
        message.success({content:res});
      }else{
        message.error({content:"An error occoured"});
      }

    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div>
      <Link to={'/customer'}><Button icon={<ArrowLeftOutlined />} style={{margin:"15px"}} type='primary'>Customer Page</Button></Link>
      <div className='form'>
      <h1 style={{color:"teal"}}>Register Customer</h1>
      <Form autoComplete='true' className='customerForm' onFinish={addCustomer}>
        <Form.Item name={'first_name'} rules={[
          {
            required: true,
            message: 'Please input your firstname!'
          },
        ]}>
          <Input placeholder='First Name'/>
        </Form.Item>
        <Form.Item name={'last_name'} rules={[
          {
            required: true,
            message: 'Please input your lastname!'
          },
        ]}>
          <Input placeholder='Last Name'/>
        </Form.Item >
        <Form.Item name={'street'} rules={[
          {
            required: true,
            message: 'Please input your street!'
          },
        ]}>
          <Input placeholder='Street'/>
        </Form.Item>
        <Form.Item name={'address'} rules={[
          {
            required: true,
            message: 'Please input your address!'
          },
        ]}>
          <Input placeholder='Address'/>
        </Form.Item>
        <Form.Item name={'city'} rules={[
          {
            required: true,
            message: 'Please input your city!'
          },
        ]}>
          <Input placeholder='City'/>
        </Form.Item >
        <Form.Item name={'state'} rules={[
          {
            required: true,
            message: 'Please input your state!'
          },
        ]}>
          <Input placeholder='State'/>
        </Form.Item>
        <Form.Item name={'email'} rules={[
          {
            required: true,
            message: 'Please input your email id!'
          },
        ]}>
          <Input placeholder='Email'/>
        </Form.Item>
        <Form.Item name={'phone'} rules={[
          {
            required: true,
            message: 'Please input your phone number!'
          },
        ]}>
          <Input placeholder='Phone'/>
        </Form.Item>
        <span></span>
        <Form.Item>
          <Button type='primary' htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  )
}

export default AddCustomer