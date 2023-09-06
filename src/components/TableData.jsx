import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Input, Popconfirm, Table, Typography, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const TableData = () => {

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.uuid === editingKey;

  const{token}=useContext(LoginContext);
  const[data,setData]=useState([]);

  const getCustomerList=async(token)=>{
    const req=await fetch("https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list",{
      headers:{
        "Authorization":"Bearer "+token
      }
    });

    try {
      
      const res=await req.json();

      if(req.status==200){
        setData(res);
      }
      if(req.status==401){
        localStorage.removeItem("token");
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getCustomerList(token.access_token);
  },[token.access_token])


  const edit = (record) => {
    form.setFieldsValue({
      first_name: '',
      last_name: '',
      address: '',
      email:'',
      phone:'',
      city:'',
      state:'',
      ...record,
    });
    setEditingKey(record.uuid);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const updateCustomer=async(data,uuid)=>{
    data=JSON.stringify(data);
    const req=await fetch(`https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${uuid}`,{
      method:"POST",
      body:data,
      headers:{
        "Authorization":"Bearer "+token.access_token
      }
    });

    try {
      if(req.status==200){
        message.success({content:"Customer updated!"});
      }else{
        message.error({content:"Body is empty!"});
      }
    } catch (error) {
      console.log(error);
    }
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.uuid);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        updateCustomer(row,key);
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const column = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      editable: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      editable: true,
    },
    {
      title: 'Street',
      dataIndex: 'street',
      editable: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      editable: true,
    },
    {
      title: 'State',
      dataIndex: 'state',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'uuid',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.uuid)}
              style={{
                marginRight: 5,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span style={{display:"flex",justifyContent:"space-around"}}>
          <DeleteOutlined onClick={()=>handleDelete(record)} style={{color:"red",fontSize:"20px",cursor:"pointer",marginRight:"10px"}}/>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditOutlined style={{color:"blue",fontSize:"20px",cursor:"pointer"}}/>
          </Typography.Link>
          </span>
        )
      },
    },
  ];
  const mergedColumns = column.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleDelete=async(record)=>{
    const req=await fetch(`https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${record.uuid}`,{
      method:"POST",
      headers:{
        "Authorization":"Bearer "+token.access_token
      }
    });

    try {
      const res=await req.text();
      if(req.status==200){
        getCustomerList(token.access_token);
        message.success({content:res});
      }else if(req.status==400){
        message.error({content:"UUID not found"});
      }else if(req.status==429){
        message.error({content:"Too many requests"});
      }else{
        message.error({content:"Error Not deleted!"})
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form form={form} component={false}>
      <Table
        rowKey={(elem)=>elem.uuid}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        className='table'
        dataSource={data}
        columns={mergedColumns}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default TableData;