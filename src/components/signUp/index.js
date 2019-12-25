import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Header from '../header'
import React,{Component} from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from "../../firebaseConfig";
import {Link} from 'react-router-dom';

// const firebaseApp = firebase.initializeApp(firebaseConfig);
class SignUp extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        firebase.auth().createUserWithEmailAndPassword(values.email,values.password).then(authUser=>{
          authUser.user.updateProfile({
            displayName: values.username
          })
        }).catch(error=>{
          console.log(error)
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{width:"80%",margin:"0 auto"}}>
         <Header/> 
      <Form style={{paddingTop:"100px",width:"80%",margin:"0 auto"}} onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' },{
              type: 'email',
              message: 'The input is not valid E-mail!',
            }],
          })(
            <Input
              prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link to={'/reset'}>
                            Forgot password
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
          Or <Link to={'/signin'}>Login!</Link>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const WrappedNormalSignUpForm = Form.create({ name: 'normal_login' })(SignUp);

export default WrappedNormalSignUpForm;