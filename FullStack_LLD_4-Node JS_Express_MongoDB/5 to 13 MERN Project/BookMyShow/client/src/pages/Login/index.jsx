import React from 'react';
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import FormItem from 'antd/es/form/FormItem';
import { LoginUser } from "../../api/users";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if(response.success) {
        message.success(response.message);
        alert("Success : " + response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        message.error(response.message);
        alert("Error : " + response.message);
      }
    } catch(err) {
      message.error(err.message);
      alert("Error : " + err.message);
    }
  }
  return (
    <>
      <main className='App-header'>
        <h1>Login to BookMyShow</h1>
        <section className="mw-500 text-center px-3">
          <Form layout='vertical' onFinish={onFinish}>

            <FormItem
              label="Email"
              htmlFor='email'
              name='email'
              className='d-block'
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please Enter a valid Email" }
              ]}>
              <Input
                id="email"
                type="text"
                placeholder="Enter your Email"
              ></Input>
            </FormItem>

            <FormItem
              label="Password"
              htmlFor='password'
              name='password'
              className='d-block'
              rules={[{ required: true, message: "Password is required" }]}>
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
              ></Input>
            </FormItem>

            <FormItem className='d-block'>
              <Button 
                type='primary'
                block
                htmlType='submit'
                style={{fontSize: "1rem", fontWeight: "600"}}
              >Submit Form</Button>
            </FormItem>

          </Form>
          <div>
            <p>
              New User ? <Link to="/register">Register Here!</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login;